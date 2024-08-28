# IonicAuth

Projet angular Ionic avec de l'authentification JWT. Nécessite le projet [symfony-auth](https://github.com/m2i-grenoble-2024/symfony-auth) qui tourne pour fonctionner. (tous les aspects d'authentification sont également valables pour un projet Angular classique)

## Nécessaire pour l'authentification
Déjà, pour ce qui est du type d'authentification utilisé dans ce projet, il s'agit d'une connexion avec JWT, qui va donc se baser sur un token d'identification à stocker dans le front et à envoyer dans les headers de requêtes vers le serveur

Côté front, on aura donc besoin :
### Une méthode de connexion
```typescript
connectedUser = signal<User|null>(null);
```
On déclare dans un AuthService un Signal qui nous permettra de tracker l'état de connexion dans les différents composants angular ou dans les autres services.

```typescript
login(user:User) {
    return this.http.post<{token:string}>(environment.serverUrl+'/api/login', user).pipe(
      tap(data => {
        localStorage.setItem('token', data.token);
      }),
      switchMap(() => this.getUser())
    );
  }
```
On fait une requête vers la route /api/login qui a été définie dans notre routes.yaml et notre security.yaml dans symfony qui va récupérer l'email et le mot de passe, et si ces derniers sont corrects, le serveur va renvoyer un JWT.
Grâce au pipe et au tap, on fait en sorte de récupérer le token en question lorsque la méthode login est appélée avec succès et on stock le JWT dans le localStorage. 
On fait aussi en sorte d'appeler une méthode getUser qui va faire une requête vers le back sur une route protégé /api/user en GET qui permet de récupérer le User connecté

```typescript
getUser() {
    return this.http.get<User>('http://localhost:8000/api/user')
            .pipe(
              tap(data => {
                localStorage.setItem('connectedUser', JSON.stringify(data));
                this.connectedUser.set(data);
              })
            );
}

```
Dans cette méthode, on fait aussi en sorte de stocker le user connecté en localStorage ce qui nous permettra de conserver l'état de connexion entre 2 rechargement de page.

On fait aussi en sorte d'assigner au Signal la valeur récupéré du user afin de mettre à jour l'interface

### Une méthode d'inscription
```typescript
postUser(user:User) {
    return this.http.post<User>('http://localhost:8000/api/user', user);
}
```
Qui va donc poster un nouveau user sur la base de données

### Une méthode de déconnexion
Le fait de se déconnecter va consister à supprimer le token et le user du localStorage et à passer une le signal à null pour mettre à jour l'interface (voir la partie "gérer l'état de connexion")

```typescript
  logout() {
    localStorage.clear();
    this.connectedUser.set(null);
  }
```

### Envoyer le token dans les requêtes
Pour que l'authentification soit effective, il faut injecter le token dans les requêtes http faites vers le serveur, on peut le faire sur chaque requête individuellement comme suit.

Exemple:
```typescript
routeProtegee(user:User) {
    return this.http.get<Truc[]>('http://localhost:8000/api/truc', {
        headers: {
            Authorization: 'Bearer '+localstorage.getItem('token')
        }
    });
}
```

Mais une manière un peu plus pratique sera de faire ce qu'on appel un interceptor qui est une classe spéciale en angular qui viendra, comme son nom l'indique, intercepter toutes les requêtes faites avec HttpClient et appliquera une modification dessus.

Dans [cet interceptor](src/app/auth-interceptors.ts), on fait fait en sorte de rajouter le Authorization Bearer avec le token dans chacune des requêtes qui sera effectuée :

```typescript
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return next(req)
    }

    const auth = inject(AuthService);
    const router = inject(Router);
    
    //On crée un header Authorization dans lequel on concatène le token
    const headers = new HttpHeaders({
        Authorization: 'Bearer ' + token
    });
    //On clone la requête pasque la doc dit de le faire
    const newReq = req.clone({
        headers
    })
    //On fait suivre la requête
    return next(newReq).pipe(
        tap({
            error: (err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status != 401) {
                        return;
                    }
                    auth.logout();
                    router.navigate(['login']);
                }
            }


        })
    )

}
```

On vérifie donc qu'on a un token en localStorage, si oui on modifie la requête sortante pour y ajouter un header Authorization Bearer avec le token dedans.

On rajoute également une interception d'erreur pour faire que si jamais on reçoit une erreur 401 alors qu'on a mis le token dans la requête, ça signifie que notre token a expiré/n'est plus valide, dans ce cas là on se déconnecte avec la méthode logout du service et on fait une redirection vers la page d'inscription/connexion.


### Gérer l'état de connexion
Pour afficher l'interface comme il faut selon l'état de connexion et selon les informations du user connecté, s'il est présent, il faut une manière de stocker quelque part l'état de la connexion'.

Pour ça, on peut partir sur le fait de stocker un User sous forme de Signal dans le AuthService
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connectedUser = signal<User|null>(null);
```

L'idée sera de faire en sorte que lorsqu'on fait un login, on mette le User connecté dans le Signal, et dans le cas d'un logout, en plus de supprimer le token, on passe la valeur de du Signal à null.


Pour utiliser ce user dans les templates, il faudra injecter le AuthService dans le component associé, puis d'utiliser le auth.connectedUser() soit dans le template soit dans le component pour faire un affichage conditionnel à l'état de la connexion ([exemple complet](src/app/home/home.page.ts))

```typescript
export class HomePage {

  constructor(public auth:AuthService) { }
```
