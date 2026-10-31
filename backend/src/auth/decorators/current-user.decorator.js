import { createParamDecorator } from '@nestjs/common';
export const CurrentUser = createParamDecorator((field, ctx) => {
    const user = ctx.switchToHttp().getRequest().user;
    return field ? user?.[field] : user;
});
//# sourceMappingURL=current-user.decorator.js.map