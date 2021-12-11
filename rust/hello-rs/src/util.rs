pub mod random {
    pub fn uint32(l: u32, r: u32) -> u32 {
        let x = rand::random::<u32>();
        if l < r {
            x % (r - l) + l
        } else if l == r {
            l
        } else {
            x % (l - r) + r
        }
    }
}
