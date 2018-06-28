function SignUpPost() {
    console.log("sign up");
}

function GoogleSignUp() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();

    firebase.auth().signInWithPopup(provider).then(function (result) {

        // The signed-in user info.
        var user = result.user;

        onLoginDone(user)

    }).catch(function (error) {
        console.log(error)
    });
}

function FacebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().useDeviceLanguage();

    firebase.auth().signInWithPopup(provider).then(function (result) {

        // The signed-in user info.
        var user = result.user;
        onLoginDone(user)
        // ...
    }).catch(function (error) {
        console.log(error)
    });
}

function onLoginDone(user) {
    setCookie('mgVideoChatSimple', user.displayName, 30, window.location.hostname);

    //reload to use new cookie
    window.location.reload();
}

function setCookie(cookieName, cookieValue, days, domain) {
    var domainString = (domain && domain !== 'localhost') ? ("; domain=" + domain) : '';
    document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + "; max-age=" + (60 * 60 * 24 * days) + "; path=/" + domainString;
}

function removeItem(sKey, sPath, domain) {
    var domainString = (domain && domain !== 'localhost') ? ("; domain=" + domain) : '';
    document.cookie = encodeURIComponent(sKey) +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        (domainString ? "; domain=" + domainString : "") +
        (sPath ? "; path=" + sPath : "");
}

var user = firebase.auth().currentUser;

if (user !== null) {
    user.providerData.forEach(function (profile) {
        console.log("  Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);

        onLoginDone(profile);
    });
}
else {
    removeItem("mgVideoChatSimple", "/", window.location.hostname)
}