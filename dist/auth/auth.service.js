"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const hashing_service_1 = require("./hash/hashing.service");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_config_1 = require("./config/jwt.config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    hashService;
    prismaService;
    jwtConfiguration;
    jwtService;
    constructor(hashService, prismaService, jwtConfiguration, jwtService) {
        this.hashService = hashService;
        this.prismaService = prismaService;
        this.jwtConfiguration = jwtConfiguration;
        this.jwtService = jwtService;
    }
    async authenticate(credentials) {
        try {
            const user = await this.prismaService.user.findFirst({
                where: { Email: credentials.email },
            });
            if (!user) {
                throw new common_1.HttpException(`User not found`, 404);
            }
            const isValidPassword = await this.hashService.compare(credentials.password, user.Password);
            if (!isValidPassword) {
                throw new common_1.HttpException(`The email/password is incorrect`, 401);
            }
            const token = await this.jwtService.signAsync({
                sub: user.Id,
                email: user.Email,
            }, {
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.jwtTtl,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            });
            return {
                id: user.Id,
                name: user.Name,
                email: user.Email,
                token: token,
            };
        }
        catch (err) {
            throw new common_1.HttpException(`An error ocurred while trying to log in: ${err}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [hashing_service_1.HashingServiceProtocol,
        prisma_service_1.PrismaService, void 0, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map