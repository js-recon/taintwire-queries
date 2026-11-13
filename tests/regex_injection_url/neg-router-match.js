const router = createRouter();
const path = location.hash.slice(1);
router.match(path, router.current);
class History {
    go() {
        this.search(location.search);
    }
}
