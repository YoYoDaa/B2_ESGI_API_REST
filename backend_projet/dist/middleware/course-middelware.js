"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const isCourseManager = (
//   request: express.Request,
//   response: express.Response,
//   next: express.NextFunction
// ) => {
//   try {
//     const authHeader = request.get('Authorization');
//     const token = authHeader!.replace('Bearer ', '');
//     const decodedToken: any = jwt.verify(token, secretPass.passwordToken);
//     if (
//       decodedToken.aud !== 'admin' ||
//       decodedToken.aud !== 'respPedago' ||
//       decodedToken.aud !== 'attProm' ||
//       decodedToken.aud !== 'repro'
//     ) {
//       throw new Error('Not authorized');
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     response.status(401).send(error);
//   }
// };
// export { isCourseManager };
//# sourceMappingURL=course-middelware.js.map