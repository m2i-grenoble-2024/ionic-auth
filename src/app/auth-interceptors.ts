import { HttpHeaders, HttpInterceptorFn } from "@angular/common/http";


/**
 * Intercepteur qui a pour but de globalement paramétré le HttpClient pour ajouter
 * le JWT dans les headers de toutes les requêtes, si on a effectivement un JWT.
 * (pour que ça marche, il faut l'ajouter dans les intercepteurs dans le main.ts)
 */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return next(req)
    }
    //On crée un header Authorization dans lequel on concatène le token
    const headers = new HttpHeaders({
        Authorization: 'Bearer ' + token
    });
    //On clone la requête pasque la doc dit de le faire
    const newReq = req.clone({
        headers
    })
    //On fait suivre la requête
    return next(newReq)

}