import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";


export class AuthController {

    //DI
    constructor(
        public readonly authService: AuthService,
    ){}

    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${ error }`);
        return res.status(500).json({error: 'Internal server error'});
    }

    //metodos de la clase

    //metodo de flecha
    registerUser = (req: Request, res: Response) => {

        //recibo del body del request y lo paso al dto para validar si esta todo ok
        const [ error, registerDto ] = RegisterUserDto.create( req.body ); //de la desestructuracion puedo nombrarlo como quiero..

        //si la validacion no pasa, devuelvo error.
        if ( error ) return res.status(400).json({error});
        

        //si la validacion pasa, registro el usuario.
        this.authService.registerUser(registerDto!)
            .then( (user) => res.json(user) )
            .catch( error => this.handleError( error, res) );
            
        // res.json('registerUser');
        //res.json( registerDto );


    }


    loginUser = (req: Request, res: Response) => {

        //recibo del body del request y lo paso al dto para validar si esta todo ok
        const [ error, loginUsuarioDto ] = LoginUserDto.create( req.body ); //de la desestructuracion puedo nombrarlo como quiero..

        //si la validacion no pasa, devuelvo error.
        if ( error ) return res.status(400).json({error});
        

        //si la validacion pasa, registro el usuario.
        this.authService.loginUser(loginUsuarioDto!)
            .then( (user) => res.json(user) )
            .catch( error => this.handleError( error, res) );
    }


    validateEmail = (req: Request, res: Response) => {

        res.json('validateEmail');
    }

    
}