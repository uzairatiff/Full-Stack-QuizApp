const authCheck = ()=>{
    const user = localStorage.getItem("user")    
    console.log(user);
    if (user == null) {
        window.location.replace("../index.html")
    }
    
}


export{
    authCheck
}