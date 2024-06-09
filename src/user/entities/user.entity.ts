import {Column, Entity } from "typeorm";
import { BaseEntity } from "src/model/base.entity";
import { StreamPriorityOptions } from "http2";
import { Status } from "../enums";


export class User{

id: number;
username: string;
password: string;
status: Status;
createdAt: Date;
updatedAt: Date;

}