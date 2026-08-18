import Container from "../common/Container";

const stats = [
  { value: "5L+",  label: "Learners" },
  { value: "100+", label: "Programs" },
  { value: "25+",  label: "Years" },
  { value: "50+",  label: "Trainers" },
];

const StatsSection = () => {
  return (
    <section style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)", height: "90px" }}>
      <Container style={{ height: "100%" }}>
        <div style={{ display: "flex", alignItems: "stretch", height: "90px" }}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div style={{ fontSize: "28px", fontFamily: "'Manrope', system-ui, sans-serif", fontWeight: 800, color: "var(--navy)", lineHeight: 1, marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
