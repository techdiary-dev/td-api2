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
exports.Admin = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const bcryptjs_1 = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");
const bcryptjs_2 = require("bcryptjs");
const graphql_1 = require("@nestjs/graphql");
let Admin = class Admin {
    comparePassword(passwordText) {
        return bcryptjs_2.compare(passwordText, this.password);
    }
};
__decorate([
    graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Admin.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    typegoose_1.prop({ unique: true }),
    __metadata("design:type", String)
], Admin.prototype, "username", void 0);
__decorate([
    graphql_1.Field(),
    typegoose_1.prop({ unique: true }),
    __metadata("design:type", String)
], Admin.prototype, "email", void 0);
__decorate([
    graphql_1.Field(),
    typegoose_1.prop({ minlength: 6 }),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
Admin = __decorate([
    typegoose_1.plugin(uniqueValidator, { message: '{VALUE} already taken' }),
    typegoose_1.pre('save', function () {
        this.password = bcryptjs_1.hashSync(this.password);
    }),
    graphql_1.ObjectType()
], Admin);
exports.Admin = Admin;
//# sourceMappingURL=admin.type.js.map