use actix_web::{get, post, web, App, HttpResponse, HttpRequest, HttpServer, Responder};

// curl 127.0.0.1:8080
// curl 127.0.0.1:8080/player/paoqi
async fn greet(req: HttpRequest) -> impl Responder {
    let name = req.match_info().get("name").unwrap_or("World");
    format!("Hello {}!", &name)
}

// curl 127.0.0.1:8080/player/1/paoqi/index.html
#[get("/player/{id}/{name}/index.html")]
async fn index(web::Path((id, name)): web::Path<(u32, String)>) -> impl Responder {
    format!("Hello {}({})!", name, id)
}

// curl 127.0.0.1:8080/echo -H "Content-Type: application/json" -d "{ "name": "paoqi" }"
#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(greet))
            .route("/player/{name}", web::get().to(greet))
            .service(index)
            .service(echo)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
