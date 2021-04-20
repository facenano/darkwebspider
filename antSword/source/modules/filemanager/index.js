/**
 * 文件管理模板
 * 更新：2016/05/14
 * 作者：蚁逅 <https://github.com/antoor>
 */
'use strict';

const Files = require('./files');
const Tasks = require('./tasks');
const Folder = require('./folder');
const ENCODES = require('../../base/encodes');

const fs = require('fs');
const iconv = require('iconv-lite');
const crypto = require('crypto');
const mime = require("mime");
const PATH = require("path");
const dialog = antSword.remote.dialog;

// 加载语言模板
const LANG = antSword['language']['filemanager'];
const LANG_T = antSword['language']['toastr'];

class FileManager {

  constructor(opts) {
    const tabbar = antSword['tabbar'];
    const hash = String(Math.random()).substr(2, 10);

    tabbar.addTab(
      `tab_filemanager_${hash}`,
      `<i class="fa fa-folder-o"></i> ${opts['ip']}`,
      null, null, true, true
    );

    // 创建框架
    const cell = tabbar.cells(`tab_filemanager_${hash}`);
    // 增加到全局变量方便调试
    antSword['modules']['filemanager'] = antSword['modules']['filemanager'] || {};
    antSword['modules']['filemanager'][hash] = this;

    let config = {
      openfileintab: false,
      bookmarks: {},
    };

    this.config = JSON.parse(antSword['storage']("adefault_filemanager", false, JSON.stringify(config)));
    this.isWin = true;
    this.path = '/';
    this.home = '/';
    this.devices = [];
    // this.cache = {};
    this.cell = cell;
    this.opts = opts;
    this.cache = new antSword['CacheManager'](opts['_id']);
    this.core = new antSword['core'][opts['type']](opts);
    this.win = new dhtmlXWindows();
    this.win.attachViewportTo(this.cell.cell);

    // 获取基本信息
    const cache_info = this.cache.get('info');
    if (cache_info) {
      this.initUI(cache_info);
    } else {
      this.cell.progressOn();
      this.core.request(
        this.core.base.info()
      ).then((ret) => {
        this.initUI(ret['text']);
        this.cell.progressOff();
      }).catch((err) => {
        this.cell.progressOff();
        this.cell.close();
        toastr.error((typeof (err) === 'object') ? JSON.stringify(err) : String(err), LANG_T['error']);
      });
      // this.core.base.info((ret) => {
      //   this.initUI(ret);
      //   this.cell.progressOff();
      // }, (err) => {
      //   this.cell.progressOff();
      //   this.cell.close();
      //   toastr.error((typeof(err) === 'object') ? JSON.stringify(err) : String(err), LANG_T['error']);
      // });
    }
  }

  // 初始化UI
  initUI(ret) {
    // 判断获取数据是否正确
    let info = ret.split('\t');
    if (!info.length >= 2) {
      toastr.error('Loading infomations failed!<br/>' + ret, LANG_T['error']);
      this.cache.del('info');
      return this.cell.close();
    };
    let info_path = info[0].replace(/\\/g, '/').replace(/\.$/, '');
    let info_drive = info[1];
    // 判断是否为linux
    if (info_path.substr(0, 1) === '/') {
      this.isWin = false;
    } else {
      // windows 盘符统一大写
      info_path = `${info_path.substr(0, 1).toUpperCase()}${info_path.substr(1)}`;
      info_drive = info_drive.toUpperCase();
    };
    this.path = info_path;
    this.home = info_path;
    info_drive.split(':').map((_) => {
      if (!_) {
        return
      };
      this.devices.push(_ === '/' ? _ : _ + ':/');
    });

    // 模块对象
    const layout = this.cell.attachLayout('3L');
    this.folder = new Folder(layout.cells('a'), this);
    this.files = new Files(layout.cells('b'), this);
    this.tasks = new Tasks(layout.cells('c'), this);

    this.folder.cell.progressOn();
    this.files.cell.progressOn();
    this.getFiles(this.path, (files) => {
      this.folder.parse(files);
      this.files.parse(files);
    });
  }

  // 本地存储
  // storage('save_key').get('{}')
  // storage('save_key').set('{a:123}')
  storage(key) {
    let md5 = crypto.createHash('md5');
    md5.update(this.opts['url']);
    const k = `${md5.digest('hex').substr(0, 11)}_${key}`
    return {
      get: (def) => localStorage.getItem(k) || def,
      set: (val) => localStorage.setItem(k, val)
    }
  }

  // 获取目录文件列表
  getFiles(p, callback) {

    let self = this;
    if (self.isWin) { // 处理输入为 f:\ 这种情况
      p = p.replace(/\\/g, '/');
      p = p.substr(1, 2) == ":/" ? `${p.substr(0, 1).toUpperCase()}${p.substr(1)}` : p;
    }
    let path = this.changePath(p);
    if (self.isWin) { // 处理输入为 f: 这种情况
      path = path.substr(1, 2) == ":/" ? `${path.substr(0, 1).toUpperCase()}${path.substr(1)}` : path;
    }
    let cache;

    if (!path.endsWith('/')) {
      path += '/'
    };
    this.path = path;
    let cache_tag = 'filemanager-files-' + Buffer.from(this.path).toString('base64');

    // 判断是否有缓存
    // if (cache = this.cache[path]) {
    //   return callback(cache);
    // };
    if ((this.opts.otherConf || {})['filemanager-cache'] !== 0 && (cache = this.cache.get(cache_tag))) {
      return callback(JSON.parse(cache));
    };

    this.core.request(
      this.core.filemanager.dir({
        path: path
      })
    ).then((res) => {
      let ret = antSword.unxss(res['text']);
      // 判断是否出错
      if (ret.startsWith('ERROR://')) {
        callback([]);
        return toastr.error(ret.substr(9), LANG_T['error']);
      };
      let tmp = ret.split('\n');

      tmp.sort();

      let folders = [];
      let files = [];

      tmp.map((t) => {
        let _ = t.split('\t');
        let d = {
          name: _[0],
          time: _[1],
          size: _[2],
          attr: _[3]
        }
        if (_[0].endsWith('/')) {
          folders.push(d);
        } else {
          files.push(d);
        }
      });

      let data = folders.concat(files);
      callback(data);

      // 增加缓存
      // self.cache[path] = data;
      this.cache.set(cache_tag, JSON.stringify(data));
    }).catch((err) => {
      toastr.error((err instanceof Object) ? JSON.stringify(err) : String(err), LANG_T['error']);
      this.folder.cell.progressOff();
      this.files.cell.progressOff();
    })

    // this.core.filemanager.dir({
    //   path: path
    // }, (ret) => {
    //   // 判断是否出错
    //   if (ret.startsWith('ERROR://')) {
    //     callback([]);
    //     return toastr.error(ret.substr(9), LANG_T['error']);
    //   };
    //   let tmp = ret.split('\n');
    //
    //   tmp.sort();
    //
    //   let folders = [];
    //   let files = [];
    //
    //   tmp.map( (t) => {
    //     let _ = t.split('\t');
    //     let d = {
    //       name: _[0],
    //       time: _[1],
    //       size: _[2],
    //       attr: _[3]
    //     }
    //     if (_[0].endsWith('/')) {
    //       folders.push(d);
    //     }else{
    //       files.push(d);
    //     }
    //   } );
    //
    //   let data = folders.concat(files);
    //   callback(data);
    //
    //   // 增加缓存
    //   // self.cache[path] = data;
    //   this.cache.set(cache_tag, JSON.stringify(data));
    // }, (err) => {
    //   toastr.error((err instanceof Object) ? JSON.stringify(err) : String(err), LANG_T['error']);
    // });
  }

  // 更改目录，返回最终绝对路径
  changePath(path) {
    if (!this.path.endsWith('/')) {
      this.path += '/';
    };
    if (!path.endsWith('/')) {
      path += '/';
    };
    // 如果是当前目录，返回
    if (path === './') {
      return this.path;
      // 如果是上级目录，则判断是否为最后一级？返回最后一级：返回上一级
    } else if (path === '../') {
      let _ = this.path.split('/');
      if (_.length === 2) {
        return _.join('/');
      } else if (_.length > 2) {
        _.pop();
        _.pop();
        _.length === 1 ? _.push('') : 0;
        return _.join('/');
      } else {
        return this.path;
      }
      // 如果是根目录，返回
    } else if (path.startsWith('/') || path.substr(1, 2) === ':/') {
      return path;
      // 如果是相对路径，返回绝对全路径
    } else {
      return this.path + path;
    }
  }

  // 删除文件/目录
  deleteFile(files) {

    let self = this;

    layer.confirm(
      LANG['delete']['confirm'](files.length > 1 ? files.length : files[0]), // 已在 lang 中过滤
      {
        icon: 2,
        shift: 6,
        //skin: 'layui-layer-molv',
        title: `<i class="fa fa-trash"></i> ${LANG['delete']['title']}`,
      },
      (_) => {
        layer.close(_);

        files.map((p) => {
          ((p) => {
            const path = this.path + p;
            this.files.cell.progressOn();
            this.core.request(
              this.core.filemanager.delete({
                path: path
              })
            ).then((res) => {
              let ret = res['text'];
              this.files.cell.progressOff();
              if (ret === '1') {
                toastr.success(LANG['delete']['success'](path), LANG_T['success']);
                this.files.refreshPath();
              } else {
                toastr.error(LANG['delete']['error'](path, ret === '0' ? false : ret), LANG_T['error']);
              }
            }).catch((err) => {
              this.files.cell.progressOff();
              toastr.error(LANG['delete']['error'](path, err), LANG_T['error']);
            });
            // this.core.filemanager.delete({
            //   path: path
            // }, (ret) => {
            //   this.files.cell.progressOff();
            //   if (ret === '1') {
            //     toastr.success(LANG['delete']['success'](path), LANG_T['success']);
            //     this.files.refreshPath();
            //   }else{
            //     toastr.error(LANG['delete']['error'](path, ret === '0' ? false : ret), LANG_T['error']);
            //   }
            // }, (err) => {
            //   this.files.cell.progressOff();
            //   toastr.error(LANG['delete']['error'](path, err), LANG_T['error']);
            // })
          })(p);
        });
      }
    )

  }

  // 粘贴文件/文件夹
  // source: 复制源文件/目录
  // name: 复制文件/目录名
  pasteFile(source, name) {

    const target = this.path + name;

    this.files.cell.progressOn();
    this.core.request(
      this.core.filemanager.copy({
        path: source,
        target: target
      })
    ).then((res) => {
      let ret = res['text'];
      this.files.cell.progressOff();
      if (ret === '1') {
        // 刷新目录
        this.files.refreshPath();
        // 删除缓存
        delete this.files.Clipboard[name];
        toastr.success(LANG['paste']['success'](name), LANG_T['success']);
      } else {
        toastr.error(LANG['paste']['error'](name, ret === '0' ? false : ret), LANG_T['error']);
      }
    }).catch((err) => {
      toastr.error(LANG['paste']['error'](name, err), LANG_T['error']);
    });
  }

  // 重命名
  renameFile(name) {
    const isDir = name.endsWith('/');
    layer.prompt({
      value: antSword.noxss(name.replace(/\/$/, '')),
      title: `<i class="fa fa-fa fa-font"></i> ${LANG['rename']['title']} (${antSword.noxss(name)})`
    }, (value, index, elem) => {
      this.files.cell.progressOn();
      this.core.request(
        this.core.filemanager.rename({
          path: this.path + name,
          name: this.path + value + ((isDir && !value.endsWith('/')) ? '/' : '')
        })
      ).then((res) => {
        let ret = res['text'];
        this.files.cell.progressOff();
        if (ret === '1') {
          this.files.refreshPath();
          toastr.success(LANG['rename']['success'], LANG_T['success']);
        } else {
          toastr.error(LANG['rename']['error'](ret === '0' ? false : ret), LANG_T['error']);
        }
      }).catch((err) => {
        toastr.error(LANG['rename']['error'](err), LANG_T['error']);
      });
      layer.close(index);
    });
  }

  // 新建目录
  createFolder() {
    layer.prompt({
      value: LANG['createFolder']['value'],
      title: `<i class="fa fa-folder"></i> ${LANG['createFolder']['title']}`
    }, (value, i, e) => {
      this.files.cell.progressOn();
      this.core.request(
        this.core.filemanager.mkdir({
          path: this.path + value
        })
      ).then((res) => {
        let ret = res['text'];
        this.files.cell.progressOff();
        if (ret === '1') {
          this.files.refreshPath();
          toastr.success(LANG['createFolder']['success'](value), LANG_T['success']);
        } else {
          toastr.error(LANG['createFolder']['error'](value, ret === '0' ? false : ret), LANG_T['error']);
        }
      }).catch((err) => {
        toastr.error(LANG['createFolder']['error'](value, err), LANG_T['error']);
      });
      layer.close(i);
    });
  }

  // 新建文件
  createFile() {
    layer.prompt({
      value: LANG['createFile']['value'],
      title: `<i class="fa fa-file"></i> ${LANG['createFile']['title']}`
    }, (value, i, e) => {
      this.files.cell.progressOn();

      // 发起http请求
      this.core.request(
        this.core.filemanager.create_file({
          path: this.path + value,
          content: '#Halo AntSword!'
        })
      ).then((res) => {
        let ret = res['text'];
        this.files.cell.progressOff();
        if (ret === '1') {
          this.files.refreshPath();
          toastr.success(LANG['createFile']['success'](value), LANG_T['success']);
        } else {
          toastr.error(LANG['createFile']['error'](value, ret === '0' ? false : ret), LANG_T['error']);
        }
      }).catch((err) => {
        toastr.error(LANG['createFile']['error'](value, err), LANG_T['error']);
      });
      layer.close(i);
    })
  }

  // 重命名文件/夹
  retimeFile(name, oldtime) {
    layer.prompt({
      value: oldtime,
      title: `<i class="fa fa-clock-o"></i> ${LANG['retime']['title']} (${antSword.noxss(name)})`,
      content: `<input type="text" class="layui-layer-input" onClick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'});" value="${oldtime}">`
    }, (value, i, e) => {
      this.files.cell.progressOn();
      let path = this.path;
      if (this.isWin) {
        path = path.replace(/\//g, '\\')
      }
      // http request
      this.core.request(
        this.core.filemanager.retime({
          // path: this.path + name,
          path: path + name,
          time: value
        })
      ).then((res) => {
        let ret = res['text'];
        this.files.cell.progressOff();
        if (ret === '1') {
          this.files.refreshPath();
          toastr.success(LANG['retime']['success'](name), LANG_T['success']);
        } else {
          toastr.error(LANG['retime']['error'](name, ret === '0' ? false : ret), LANG_T['error']);
        }
      }).catch((err) => {
        toastr.error(LANG['retime']['error'](name, err), LANG_T['error']);
      });
      layer.close(i);
    })
  }

  // 设置文件和目录权限
  chmodFile(name, oldmod) {
    layer.prompt({
      value: antSword.noxss(oldmod),
      title: `<i class="fa fa-users"></i> ${LANG['chmod']['title']} (${antSword.noxss(name)})`,
    }, (value, i, e) => {
      if (!value.match(/^[0-7]{4}$/)) {
        toastr.error(LANG['chmod']['check'], LANG_T['error']);
        return
      }
      this.files.cell.progressOn();
      let path = this.path;
      if (this.isWin) {
        path = path.replace(/\//g, '\\')
      }
      // http request
      this.core.request(
        this.core.filemanager.chmod({
          path: path + name,
          mode: value
        })
      ).then((res) => {
        let ret = res['text'];
        this.files.cell.progressOff();
        if (ret === '1') {
          this.files.refreshPath();
          toastr.success(LANG['chmod']['success'](name), LANG_T['success']);
        } else {
          toastr.error(LANG['chmod']['error'](name, ret === '0' ? false : ret), LANG_T['error']);
        }
      }).catch((err) => {
        toastr.error(LANG['chmod']['error'](name, err), LANG_T['error']);
      });
      layer.close(i);
    });
  }

  // 预览文件(图片、视频)
  previewFile(name, size) {
    let that = this;
    const remote_path = this.path + name;
    const win = that.createWin({
      title: 'Loading File: ' + antSword.noxss(remote_path),
      width: 800,
      height: 600,
    });
    var filemime = mime.lookup(name);
    let savepath = PATH.join(process.env.AS_WORKDIR, `antData/.temp/`, Buffer.from(name).toString("hex"));
    win.cell.lastChild['style']['overflow'] = 'scroll';
    win.cell.lastChild['style']['textAlign'] = 'center';

    let down_size = 0;
    this.core.download(
      savepath, this.core.filemanager.download_file({
        path: remote_path
      }), (_size) => {
        down_size += _size;
        let down_progress = parseInt(parseFloat(down_size / size).toFixed(2) * 100);
        if (!(down_progress % 5)) {
          win.setText(`Preview File: ${antSword.noxss(remote_path)} ${down_progress}%`);
        };
      }
    ).then((_size) => {
      if (_size === size) {
        win.setText(`Preview File: ${antSword.noxss(remote_path)}`);
        let buff = fs.readFileSync(savepath);
        switch (filemime) {
          default:
            let data = Buffer.from(buff).toString('base64');
            win.attachHTMLString(`<img style="width:100%" src="data:/${filemime};base64,${data}"/>`);
            break;
        }
        fs.unlink(savepath);
      } else {
        fs.unlink(savepath);
        throw Error(`Load Error: downsize ${_size} != ${size}`);
      }
    }).catch((err) => {

    });
  }

  // 下载文件
  downloadFile(name, size) {
    const path = this.path + name;
    const task = this.tasks.new(LANG['download']['task']['name'], path, LANG['download']['task']['wait']);
    // 获取要保存的路径
    dialog.showSaveDialog({
      title: LANG['download']['title'],
      defaultPath: name
    }, (filePath) => {
      if (!filePath) {
        return task.end(LANG['download']['task']['cancel'])
      };
      task.update(LANG['download']['task']['start']);
      let down_size = 0;
      // 删除旧文件（如果存在
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      this.core.download(
        filePath, this.core.filemanager.download_file({
          path: path
        }), (_size) => {
          // 计算进度百分比
          down_size += _size;
          let down_progress = parseInt(parseFloat(down_size / size).toFixed(2) * 100);

          if (!(down_progress % 5)) {
            task.update(down_progress + '%');
          };
        }
      ).then((_size) => {
        if (_size === size) {
          task.success(LANG['download']['task']['success']);
          toastr.success(LANG['download']['success'](name), LANG_T['success']);
          // }else if (_size === 21) {
          //   task.failed('len=' + _size);
        } else {
          throw Error(`SizeErr: ${_size} != ${size}`);
          // task.failed(LANG['download']['task']['error']())
        }
      }).catch((err) => {
        task.failed(LANG['download']['task']['error'](err));
        toastr.error(LANG['download']['error'](name, err), LANG_T['error']);
      });
    });
  }

  // 下载多个文件
  // [{name:"123.txt", size: 1234}]
  downloadFileMulti(names = []) {
    let self = this;
    let selectPaths = dialog.showOpenDialog({
      title: LANG['download']['title'],
      properties: ['openDirectory'],
    });
    let savePath = null;
    if (selectPaths && selectPaths.length === 1) {
      savePath = selectPaths[0];
    }
    if (!savePath) {
      return;
    }
    names.forEach((item) => {
      const path = self.path + item.name;
      const task = self
        .tasks
        .new(LANG['download']['task']['name'], path, LANG['download']['task']['wait']);
      task.update(LANG['download']['task']['start']);
      let down_size = 0;
      let filePath = PATH.join(savePath, item.name);
      // 删除旧文件（如果存在
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      self.core.download(filePath, self.core.filemanager.download_file({
        path: path
      }), (_size) => {
        // 计算进度百分比
        down_size += _size;
        let down_progress = parseInt(parseFloat(down_size / item.size).toFixed(2) * 100);
        if (!(down_progress % 5)) {
          task.update(down_progress + '%');
        };
      })
        .then((_size) => {
          if (_size === item.size) {
            task.success(LANG['download']['task']['success']);
            toastr.success(LANG['download']['success'](name), LANG_T['success']);
            // }else if (_size === 21) {   task.failed('len=' + _size);
          } else {
            throw Error(`SizeErr: ${_size} != ${item.size}`);
            // task.failed(LANG['download']['task']['error']())
          }
        })
        .catch((err) => {
          task.failed(LANG['download']['task']['error'](err));
          toastr.error(LANG['download']['error'](name, err), LANG_T['error']);
        });
    });
  }

  // wget文件
  wgetFile() {
    let self = this;
    let hash = +new Date();
    // 获取URL
    let _index = layer.prompt({
      title: `<i class="fa fa-cloud-download"></i> ${LANG['wget']['title']}`,
      content: '<input type="text" style="width:300px;" class="layui-layer-input" id="url_' + hash + '" value="http://" placeholder="target url"><p/><input style="width:300px;" type="text" id="path_' + hash + '" class="layui-layer-input" value="' + antSword.noxss(self.path) + '" placeholder="file name">',
      btn: ['wget'],
      yes: (i) => {

        let _url = $(`#url_${hash}`);
        let _path = $(`#path_${hash}`);

        let url = _url.val();
        let path = _path.val();

        if (url.split('/').length < 4) {
          _url.focus();
          return toastr.warning(LANG['wget']['check'], LANG_T['warning']);
        };
        if (path.length < 1) {
          return _path.focus();
        };
        const task = this.tasks.new(LANG['wget']['task']['name'], `${url} -> ${path}`);
        task.update(LANG['wget']['task']['start']);

        // http request
        this.core.request(
          this.core.filemanager.wget({
            url: url,
            path: path
          })
        ).then((res) => {
          let ret = res['text'];
          // 下载成功？当前目录？刷新：删除缓存
          if (ret === '1') {
            task.success(LANG['wget']['task']['success']);
            let _ = path.substr(0, path.lastIndexOf('/') + 1);
            this.files.refreshPath((_ === self.path) ? false : _);
          } else {
            task.failed(LANG['wget']['task']['failed'](ret));
          }
        }).catch((err) => {
          task.failed(LANG['wget']['task']['error'](err));
        });
        layer.close(i);
      }
    });
    $(`#layui-layer${_index}`).css('width', '400px');
  }

  /**
   * 上传文件
   * @param  {Array} _filePaths 要上传的本地文件路径（可选，如未指定，则调用文件选择框
   * @return {None}            [description]
   */
  uploadFile(_filePaths) {
    // 任务列表
    let tasks = {};
    // 上传路径
    let path = this.path;
    new Promise((res, rej) => {
      // 获取要上传的文件列表
      if (Array.isArray(_filePaths) && _filePaths.length > 0) {
        return res(_filePaths);
      }
      dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections']
      }, (_filePaths) => {
        if (!_filePaths) {
          return
        };
        return res(_filePaths);
      })
    }).then((filePaths) => {
      // 初始化任务
      filePaths.map((f) => {
        const fileName = f.substr(f.lastIndexOf(PATH.sep) + 1);
        tasks[f] = this.tasks.new(LANG['upload']['task']['name'], `${fileName} => ${path}`, 'Waiting for uploading..');
      });
      return filePaths;
    }).then((filePaths) => {
      // 文件上传（逐个队列上传
      const upload = () => {
        new Promise((res, rej) => {
          // 获取单个上传文件
          let filePath = filePaths.shift();
          if (filePath) {
            res(filePath);
          }
        }).then((filePath) => {
          // 上传单个
          let buffIndex = 0;
          let buff = [];
          // 分段上传大小，默认0.5M(jsp 超过1M响应会出错)
          let dataSplit = 500 * 1024;
          if (parseInt((this.opts.otherConf || {})['upload-fragment']) > 0) {
            dataSplit = parseInt((this.opts.otherConf || {})['upload-fragment']) * 1024;
          }
          let task = tasks[filePath];
          // 获取文件名
          let fileName = filePath.substr(filePath.lastIndexOf(PATH.sep) + 1);
          // 读取文件buff
          let fileBuff;
          try {
            fileBuff = fs.readFileSync(filePath);
          } catch (e) {
            return task.failed(e);
          }
          // 文件数据分段
          let buffLength = fileBuff.length;
          while (buffIndex <= buffLength) {
            let buffSplit = fileBuff.slice(buffIndex, buffIndex + dataSplit);
            buffIndex += dataSplit;
            buff.push(buffSplit);
          }
          // 开始上传
          const uploadBuffFunc = (_buff) => {
            new Promise((res, rej) => {
              let _b = _buff.shift();
              if (_b) {
                res(_b);
              } else {
                // 上传完毕
                task.success(LANG['upload']['task']['success']);
                toastr.success(LANG['upload']['success'](fileName), LANG_T['success']);
                // 刷新缓存
                this.files.refreshPath(path === this.path ? '' : path);
                // 继续上传
                return upload();
              }
            }).then((b) => {
              // 更新进度条
              task.update(`${parseInt((buffLength - (b.length * _buff.length)) / buffLength * 100)}%`);
              this.core.request(
                this.core.filemanager.upload_file({
                  path: path + fileName,
                  content: b
                })
              ).then((res) => {
                let ret = res['text'];
                if (ret === '1') {
                  return uploadBuffFunc(_buff);
                }
                task.failed(LANG['upload']['task']['failed'](ret));
                toastr.error(LANG['upload']['error'](
                  fileName,
                  ret === '0' ? '' : `<br/>${ret}`
                ), LANG_T['error']);
              }).catch((err) => {
                // 出错后友好提示
                let errmsg = err;
                if (err.hasOwnProperty('status') && err.hasOwnProperty('response')) {
                  errmsg = `${err.status} ${err.response.res.statusMessage}`;
                  switch (err.status) {
                    case 413:
                      errmsg += `${LANG['upload']['task']['httperr_413']}`;
                      break;
                    default:
                      break;
                  }
                } else if (err.hasOwnProperty('errno')) {
                  switch (err.errno) {
                    case 'ETIME':
                      errmsg = `${LANG['upload']['task']['httperr_etime']}`;
                      break;
                    case 'ECONNREFUSED':
                      errmsg = `${LANG['upload']['task']['httperr_econnrefused']}`;
                      break;
                    default:
                      errmsg = `${err.errno} ${err.code}`;
                      break;
                  }
                }
                task.failed(LANG['upload']['task']['error'](errmsg));
                toastr.error(LANG['upload']['error'](fileName, errmsg), LANG_T['error']);
              });
            })
          }
          uploadBuffFunc(buff);
        });
      };
      upload();
    });
  }

  // 编辑文件
  editFile(name, openfileintab = false) {
    let self = this;
    let path = this.path + name;
    let editor = null;
    let codes = '';
    let win;
    let hinttext = '';
    let tooltip = `IP:${this.opts['ip']} File:`;
    if (openfileintab == false) {
      win = this.createWin({
        title: LANG['editor']['title'](antSword.noxss(path)),
        width: 800
      });
      win.maximize();
    } else {
      let _id = String(Math.random()).substr(5, 10);
      antSword['tabbar'].addTab(
        `tab_file_${_id}`,
        `<i class="fa fa-file-o"></i> ${antSword.noxss(name)}`,
        null, null, true, true
      );
      win = antSword['tabbar'].cells(`tab_file_${_id}`);
      let hitpath = path;
      if (path.length > 100) {
        let tmpbuf = Buffer.alloc(100, '.');
        tmpbuf.write(this.path, 0, 100 - name.length - 4);
        tmpbuf.write('/', 100 - name.length - 1);
        tmpbuf.write(name, 100 - name.length);
        hitpath = tmpbuf.toString();
      }
      hinttext = `IP:${this.opts['ip']} File:`;
    }

    win.progressOn();

    // 检测文件后缀
    let ext = name.substr(name.lastIndexOf('.') + 1);
    let ext_dict = {
      'php': 'php',
      'c': 'c_cpp',
      'cpp': 'c_cpp',
      'h': 'c_cpp',
      'coffee': 'coffee',
      'cfm': 'coldfusion',
      'css': 'css',
      'go': 'golang',
      'html': 'html',
      'ini': 'ini',
      'conf': 'ini',
      'jade': 'jade',
      'java': 'java',
      'js': 'javascript',
      'json': 'json',
      'jsp': 'jsp',
      'jsx': 'jsx',
      'less': 'less',
      'lua': 'lua',
      'md': 'markdown',
      'sql': 'sql',
      'pl': 'perl',
      'py': 'python',
      'rb': 'ruby',
      'sh': 'sh',
      'txt': 'text',
      'xml': 'xml'
    }
    if (!(ext in ext_dict)) {
      ext = 'txt'
    };
    // 创建窗口工具栏
    let toolbar = win.attachToolbar();
    let _options = [];
    for (let _ in ext_dict) {
      let _ext = ext_dict[_];
      let _opt = {
        id: `mode_${_ext}`,
        text: `${_ext} (.${_})`,
        icon: 'code',
        type: 'button'
      };
      (_ === ext) ? _opt['selected'] = true : 0;
      _options.push(_opt);
    }
    toolbar.loadStruct([{
      id: 'hinttext',
      type: 'text',
      text: hinttext
    },
    {
      id: 'filepath',
      type: 'buttonInput',
      width: 500,
      value: antSword.noxss(path),
    },
    {
      type: 'separator'
    },
    {
      type: 'spacer'
    },
    {
      id: 'refresh',
      type: 'button',
      icon: 'refresh',
      text: LANG['editor']['toolbar']['refresh']
    },
    {
      id: 'save',
      type: 'button',
      icon: 'save',
      text: LANG['editor']['toolbar']['save']
    },
    {
      type: 'separator'
    },
    {
      id: 'encode',
      type: 'buttonSelect',
      icon: 'language',
      openAll: true,
      text: LANG['editor']['toolbar']['encode'],
      options: (() => {
        let ret = [];
        ENCODES.map((_) => {
          let _opt_ = {
            id: `encode_${_}`,
            text: _,
            icon: 'font',
            type: 'button'
          };
          (_ === self.opts['encode'] ? _opt_['selected'] = true : 0);
          ret.push(_opt_);
        });
        return ret;
      })()
    }, {
      id: 'mode',
      type: 'buttonSelect',
      icon: 'th-list',
      openAll: true,
      text: LANG['editor']['toolbar']['mode'],
      options: _options
    },
    ]);
    toolbar.setItemToolTip('hinttext', tooltip);
    toolbar.attachEvent('onClick', (id) => {
      if (id === 'save') {
        // 保存代码
        win.progressOn();
        self.core.request(
          self.core.filemanager.create_file({
            path: path,
            content: editor.session.getValue() || '#Halo AntSword!'
          })
        ).then((res) => {
          let ret = res['text'];
          win.progressOff();
          if (ret === '1') {
            toastr.success(LANG['editor']['success'](path), LANG_T['success']);
            // 刷新目录（显示更改时间、大小等）
            self.files.refreshPath();
          } else {
            toastr.error(LANG['editor']['error'](path, ret === '0' ? '' : '<br/>' + ret), LANG_T['error']);
          }
        }).catch((err) => {

        });
      } else if (id.startsWith('mode_')) {
        let mode = id.split('_')[1];
        editor.session.setMode(`ace/mode/${mode}`);
      } else if (id.startsWith('encode_')) {
        let encode = id.split('_')[1];
        editor.session.setValue(iconv.decode(Buffer.from(codes), encode).toString());
      } else if (id === 'refresh') {
        // 获取文件代码
        win.progressOn()
        this.core.request(
          this.core.filemanager.read_file({
            path: path
          })
        ).then((res) => {
          win.progressOff();
          name = path.substr(path.lastIndexOf('/') + 1);
          if (openfileintab == false) {
            win.setText(LANG['editor']['title'](antSword.noxss(path)));
          } else {
            win.setText(`<i class="fa fa-file-o"></i> ${antSword.noxss(name)}`);
          }
          ext = name.substr(name.lastIndexOf('.') + 1);
          if (!(ext in ext_dict)) {
            ext = 'txt'
          };
          toolbar.callEvent('onClick', [`mode_${ext_dict[ext]}`]);

          let ret = antSword.unxss(res['text'], false);
          codes = Buffer.from(antSword.unxss(res['buff'].toString(), false));
          let encoding = res['encoding'] || this.opts['encode'];
          if (encoding.toUpperCase() == "UTF-8") {
            encoding = "UTF8";
          }
          toolbar.setListOptionSelected('encode', `encode_${encoding}`);
          editor.session.setValue(ret);
        }).catch((err) => {
          toastr.error(LANG['editor']['loadErr'](err), LANG_T['error']);
          win.progressOff()
        })
      } else {
        console.info('toolbar.onClick', id);
      }
    });
    toolbar.attachEvent('onEnter', (id, value) => {
      switch (id) {
        case 'filepath':
          path = toolbar.getInput('filepath').value;
          toolbar.callEvent('onClick', ['refresh']);
          break;
      }
    });

    // 获取文件代码
    this.core.request(
      this.core.filemanager.read_file({
        path: path
      })
    ).then((res) => {
      let ret = antSword.unxss(res['text'], false);
      codes = Buffer.from(antSword.unxss(res['buff'].toString(), false));
      let encoding = res['encoding'] || this.opts['encode'];
      if (encoding.toUpperCase() == "UTF-8") {
        encoding = "UTF8";
      }
      toolbar.setListOptionSelected('encode', `encode_${encoding}`);

      win.progressOff();

      // 初始化编辑器
      editor = ace.edit(win.cell.lastChild);
      editor.$blockScrolling = Infinity;
      editor.setTheme('ace/theme/tomorrow');
      editor.session.setMode(`ace/mode/${ext_dict[ext]}`);
      editor.session.setUseWrapMode(true);
      editor.session.setWrapLimitRange(null, null);

      editor.setOptions({
        fontSize: '14px',
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
      // 编辑器快捷键
      editor.commands.addCommand({
        name: 'save',
        bindKey: {
          win: 'Ctrl-S',
          mac: 'Command-S'
        },
        exec: () => {
          toolbar.callEvent('onClick', ['save']);
        }
      });

      editor.session.setValue(ret);

      // 定时刷新
      const inter = setInterval(editor.resize.bind(editor), 200);
      win.attachEvent('onClose', () => {
        clearInterval(inter);
        return true;
      });
    }).catch((err) => {
      toastr.error(LANG['editor']['loadErr'](err), LANG_T['error']);
      win.close();
    });
  }

  // 创建窗口
  createWin(opts) {
    let _id = String(Math.random()).substr(5, 10);
    // 默认配置
    let opt = $.extend({
      title: 'Window:' + _id,
      width: 660,
      height: 550
    }, opts);

    // 创建窗口
    let _win = this.win.createWindow(_id, 0, 0, opt['width'], opt['height']);
    _win.setText(opt['title']);
    _win.centerOnScreen();
    _win.button('minmax').show();
    _win.button('minmax').enable();

    // 返回窗口对象
    return _win;
  }

}

// export default FileManager;
module.exports = FileManager;