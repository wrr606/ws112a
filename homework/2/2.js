import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const room = new Map();
room.set("320", {
  "教室": "322",
  "功能": "多媒體教室",
});
room.set("319", {
  "教室": "319",
  "功能": "嵌入式實驗室",
});

const router = new Router();
router
  .get("", (context) => {
    context.response.body = `
    <html>
        <body>
        </body>
    </html>`;
  })
  .get("/nqu", (context) => {
    context.response.body = `
    <html>
        <body>
            <a href="https://www.nqu.edu.tw/">NQU</a>
        </body>
    </html>`;
  })
  .get("/nqu/csie", (context) => {
    context.response.body = `
    <html>
        <body>
            <a href="https://csie.nqu.edu.tw/">NQU_CSIE</a>
        </body>
    </html>`;
  })
  .get("/nqu/csie/:id", (context) => {
    if (context.params && context.params.id && room.has(context.params.id)) {
      context.response.body = room.get(context.params.id);
    }
  })
  .get("/to/nqu", (context) => {
    context.response.redirect('https://www.nqu.edu.tw/')
  })
  .get("/to/nqu/csie", (context) => {
    context.response.redirect('https://csie.nqu.edu.tw/')
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("start at : http://127.0.0.1:8000");
await app.listen({ port: 8000 });
