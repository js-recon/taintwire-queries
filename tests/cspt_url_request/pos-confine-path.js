// A path after a fixed prefix is still traversable ("../admin"): the path kind is reported, but for a request it
// is not a barrier (the suppression policy leaves it out for CSPT).
var t = location.hash.slice(1);
fetch("/api/users/" + t);
