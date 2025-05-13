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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const hashing_service_1 = require("../auth/hash/hashing.service");
let UserService = class UserService {
    prisma;
    hasingService;
    constructor(prisma, hasingService) {
        this.prisma = prisma;
        this.hasingService = hasingService;
    }
    async create(userDto) {
        if (userDto) {
            const passwordHash = await this.hasingService.hash(userDto.password);
            console.log('antes de criar2');
            const createUser = await this.prisma.user.create({
                data: {
                    Name: userDto.name,
                    Email: userDto.email,
                    Password: passwordHash,
                },
                select: { Id: true, Name: true, Email: true },
            });
            return createUser;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        hashing_service_1.HashingServiceProtocol])
], UserService);
//# sourceMappingURL=user.service.js.map