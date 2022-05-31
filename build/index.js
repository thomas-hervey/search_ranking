"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const elasticsearch_1 = require("@elastic/elasticsearch");
const config = {
    node: 'https://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'example'
    },
    tls: {
        ca: fs_1.default.readFileSync('./certs/es01/es01.crt'),
        rejectUnauthorized: false
    }
};
const client = new elasticsearch_1.Client(config);
function runQuickstart() {
    return __awaiter(this, void 0, void 0, function* () {
        // Let's start by indexing some data
        yield client.index({
            index: 'game-of-thrones',
            document: {
                character: 'Ned Stark',
                quote: 'Winter is coming.'
            }
        });
        yield client.index({
            index: 'game-of-thrones',
            document: {
                character: 'Daenerys Targaryen',
                quote: 'I am the blood of the dragon.'
            }
        });
        yield client.index({
            index: 'game-of-thrones',
            document: {
                character: 'Tyrion Lannister',
                quote: 'A mind needs books like a sword needs a whetstone.'
            }
        });
        // here we are forcing an index refresh, otherwise we will not
        // get any result in the consequent search
        yield client.indices.refresh({ index: 'game-of-thrones' });
        // Let's search!
        const result = yield client.search({
            index: 'game-of-thrones',
            query: {
                match: { quote: 'winter' }
            }
        });
        console.log(result.hits.hits);
        // delete index once we're done
        client.indices.delete({ index: 'game-of-thrones' });
    });
}
runQuickstart().catch(console.log);
