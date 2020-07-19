import Axios from "axios";

export function apiRequest(config) {
  const instance = Axios.create({
    baseURL:'/api',
    timeout:3000
  })

  instance.interceptors.response.use(res=>{
    return res.data.data
  },err=>{
    return err
  })

  return instance(config)
}

export function indexRequest(config) {
  const instance = Axios.create({
    baseURL:'/index',
    timeout:3000
  })

  instance.interceptors.response.use(res=>{
    return res.data.data
  },err=>{
    return err
  })

  return instance(config)
}