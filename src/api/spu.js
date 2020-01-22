import request from '@/utils/request'
import nrequest from '@/utils/nrequest'

const prefix = "http://localhost:8081"
export function getSkuListBySpuId(params) {
  return nrequest({
    url: prefix + '/getSkuListBySpuId',
    method: 'get',
    params
  })
}

export function getTableData(params) {
  return nrequest({
    url: prefix + '/table',
    method: 'post',
    params
  })
}

export function getTables(params) {
  return nrequest({
    url: prefix + '/getTableNames',
    method: 'post',
    params
  })
}

export function deleteData(params) {
  return nrequest({
    url: prefix + '/deleteData',
    method: 'post',
    params
  })
}

export function updateData(params) {
  return nrequest({
    url: prefix + '/updateData',
    method: 'post',
    params
  })
}export function addData(params) {
  return nrequest({
    url: prefix + '/addData',
    method: 'post',
    params
  })
}
