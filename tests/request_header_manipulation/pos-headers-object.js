fetch("/api/data", { headers: { "X-Tenant": location.hash.slice(1) } });
