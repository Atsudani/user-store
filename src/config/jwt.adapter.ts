import jwt from 'jsonwebtoken';
import { envs } from './envs';



const JWT_SEED = envs.JWT_SEED;



export class JwtAdapter {

    // DI? si no es necesario inyeccion de dependencias, entonces trabajar con metodos estaticos


    //esto es una funcion normal, no de flecha.. o sea metodo con funcion normal...
    static generateToken( payload: any, duration: string = '2h' ) {
        return new Promise( ( resolve ) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, ( errorFatal, tokenGenerado ) => {
                if ( errorFatal ) return resolve( null );

                resolve( tokenGenerado );
            })
        });

    }

    static validateToken( token: string ) {
        

        return;
    }

}