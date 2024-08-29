import request from "@/utils/request";

function upload(path:any,userForm:any){
    const params = new FormData()
    for(let i in userForm){
        params.append(i,userForm[i])
    }
    // console.log(params)
    return request.post(path,params,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }).then(res=>{
      // console.log('ressssssssssss');
      return res
    })
}

export default upload