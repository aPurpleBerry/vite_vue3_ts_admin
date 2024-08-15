import axios from "axios";

function upload(path:any,userForm:any){
    const params = new FormData()
    for(let i in userForm){
        params.append(i,userForm[i])
    }
    // console.log(params)
    return axios.post(path,params,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }).then(res=>{
      console.log(res);
      return res.data
    })
}

export default upload