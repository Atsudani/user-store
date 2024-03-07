import { JwtAdapter, bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, UserEntity } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';



export class AuthService {

    constructor(){}

    public async registerUser( registerUserDto: RegisterUserDto ) {
        const { email } = registerUserDto;
        const existUser = await UserModel.findOne({ email });
        if ( existUser ) throw CustomError.badRequest('Email already exist');


        try {
            const user = new UserModel(registerUserDto);
            
            //Encriptar la contrasenha
            user.password = bcryptAdapter.hash( registerUserDto.password )
            
            await user.save();
            // JWT <------ para mantener la autenticacion del usuario

            //Email de confirmacion

            // const userEntity = UserEntity.fromObject( user );

            //desestructuro para no devolver el password jiji
            const { password, ...putongo } = UserEntity.fromObject(user);

            // return userEntity;
            // return user;

            return {
                usuarioCreado: putongo,
                token: 'ABC'
            }
        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
        // return 'todo ok!';
    } 

    public async loginUser( loginUserDto: LoginUserDto ) {

        //los mensajes pongo iguales y bien generico para no darle pistas al 
        const user = await UserModel.findOne({ email: loginUserDto.email});
        if (!user) throw CustomError.badRequest('Credenciales incorrectos');

        const isMatching = bcryptAdapter.compare( loginUserDto.password, user.password );
        if ( !isMatching ) throw CustomError.badRequest('Credenciales incorrectos');

        const { password, ...propiedadesUsuario } = UserEntity.fromObject( user );

        const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });
        if ( !token ) throw CustomError.internalServer('Error creando el JWT');

        return {
            user: propiedadesUsuario,
            token
        }
    }
}