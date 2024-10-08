class JwtUser {
    userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }
}

class JwtConfig {
    algorithm: string;
    expiresIn: string;
    
    constructor(algorithm: string, expiresIn: string) {
        this.algorithm = algorithm;
        this.expiresIn = expiresIn;
    }
}


class JwtModel {

    public JwtUser: JwtUser;
    public secret: string;
    public jwtConfig: JwtConfig;

    constructor(JwtUser: JwtUser, 
                secret: string, 
                jwtConfig: JwtConfig) {
                    
        this.JwtUser = JwtUser;
        this.secret = secret;
        this.jwtConfig = jwtConfig;
    }
}

export { JwtConfig, JwtUser, JwtModel };