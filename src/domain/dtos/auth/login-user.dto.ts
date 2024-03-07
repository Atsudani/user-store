import { regularExps } from "../../../config";


export class LoginUserDto {

    //contructor privado porque lo voy a crear con el metodo estatico...
    private constructor(
        public readonly email: string,
        public readonly password: string,
    ){}

    static create( object: { [key:string]:any }):  [ string?, LoginUserDto? ]{
        const { name, email, password } = object;

        //el segundo argumento seria undefined.. entonces tecnicamente es lo mismo si no le mando explicitamente undefined..
        // if ( !name ) return ['Missing name', undefined];
        if ( !email ) return ['Missing email'];
        if ( !regularExps.email.test( email ) ) return ['Email is not valid'];
        if ( !password ) return ['Missing password'];
        if ( password.length < 6 ) return ['Password too short'];

        return [ undefined, new LoginUserDto(email, password)]
    }
}