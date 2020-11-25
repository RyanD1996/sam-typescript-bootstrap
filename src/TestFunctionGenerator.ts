import fs from "fs";

export const generateTestLambdaFunction = (options: any) => {
  fs.copyFileSync(
    "../sam-typescript-bootstrap/src/TestFunction/TestFunctionTemplate.ts",
    "src/Application/TestFunction/TestFunction.ts"
  );
};
