export default function(errorCode){
    switch(errorCode){
        case "auth/invalid-email":
            return 'Geçersiz e-posta adresi';
        case "auth/email-already-exists":
            return 'Kullanıcı Zaten Kayıtlı';
        case "auth/user-not-found":
            return 'Kullanıcı Bulunamadı';
        case "auth/invalid-credential":
            return 'Hatalı kimlik bilgisi. Lütfen tekrar deneyin.';
        case "auth/weak-password":
            return 'Parola Çok Zayıf';
        case "auth/wrong-password":
            return 'Parola Geçersiz';
        default:
            return errorCode;
    }
}