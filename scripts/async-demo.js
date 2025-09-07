const pretendFetch = () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, msg: "Done" }), 500));
const runDemo = async () => {
  try {
    const res = await pretendFetch();
    console.log("Async/Await demo:", res);
  } catch (err) {
    console.error("Demo error:", err);
  }
};
runDemo();
