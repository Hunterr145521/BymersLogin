import cookie from 'js-cookie';

// set a cookie...
export const setCookie = (key, value) => {
    if(window !== 'undefined'){
        cookie.set(key, value , {
            expires: 1
        });
    }
}


// remove from cookie...

export const removeCookie = (key) => {
    if(window !== 'undefined'){
        cookie.remove(key, {
            expires: 1
        });
    }
}



// get from cookie such as token... it will be used for make req to server with token ... 

export const getCookie = (key) => {
    if(window !== 'undefined'){
       return cookie.get(key);
    }
}




// set in localstorage

export const setLocalStorage = (key, value) => {
    if(window !== 'undefined'){
       localStorage.setItem(key, JSON.stringify(value));
    }
}



// remove from localstorage

export const removeLocalStorage = (key) => {
    if(window !== 'undefined'){
       localStorage.removeItem(key);
    }
}





// authenticate user by passing data to cookie and localstorage during signin

export const authenticate = (response, next) => {
    // this will work as middleware
    console.log("AUTHENTICATE HELPER " , response);
    setCookie('token',response.data.token);
    setLocalStorage('user', response.data.user);
    next();
}




// access user info from localstorage

export const isAuth = () => {
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            const localStorageItem = localStorage.getItem('user')
            if  (localStorageItem){
                return JSON.parse(localStorageItem)
            }else{
                return false;
            }
        }
    }
}


export const signout = (next) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
}




export const updateUser = (res, next) => {
    console.log("Update user ", res);
    if(typeof window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = res.data;
        localStorage.setItem('user',JSON.stringify(auth));
    }

    next();
}


