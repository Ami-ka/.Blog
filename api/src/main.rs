mod handlers;
mod responses;
mod routes;

use crate::routes::init_router;
use axum::serve;
use tokio::net::TcpListener;
use tower_http::trace::TraceLayer;
use tracing_subscriber;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::TRACE)
        .init();

    println!("Tracing initialized!");

    let app = init_router().layer(TraceLayer::new_for_http());
    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    println!(
        "server is running on: http://{}",
        listener.local_addr().unwrap()
    );
    serve(listener, app).await.unwrap();
}
