import { regularExps } from "../../../config";


export class RegisterUserDto {

    //contructor privado porque lo voy a crear con el metodo estatico...
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ){}

    static create( object: { [key:string]:any }):  [ string?, RegisterUserDto? ]{
        const { name, email, password } = object;

        //el segundo argumento seria undefined.. entonces tecnicamente es lo mismo si no le mando explicitamente undefined..
        // if ( !name ) return ['Missing name', undefined];
        if ( !name ) return ['Missing name'];
        if ( !email ) return ['Missing email'];
        if ( !regularExps.email.test( email ) ) return ['Email is not valid'];
        if ( !password ) return ['Missing password'];
        if ( password.length < 6 ) return ['Password too short'];

        return [ undefined, new RegisterUserDto( name, email, password)]
    }
}