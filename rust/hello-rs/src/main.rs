mod util;
use util::random;

fn main() {
    let hello: &str = "Hello, world!";
    println!("{}", hello);

    println!("{}", random::uint32(1, 10));
}
