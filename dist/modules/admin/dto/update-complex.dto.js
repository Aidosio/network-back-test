"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComplexDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_complex_dto_1 = require("./create-complex.dto");
class UpdateComplexDto extends (0, swagger_1.PartialType)(create_complex_dto_1.CreateComplexDto) {
}
exports.UpdateComplexDto = UpdateComplexDto;
//# sourceMappingURL=update-complex.dto.js.map