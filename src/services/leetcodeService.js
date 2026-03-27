export const fetchLeetCodeStats = async (username) => {
  const res = await fetch(
    `https://leetcode-stats.vercel.app/api?username=${username}`
  );

  if (!res.ok) {
    throw new Error("LeetCode API unavailable");
  }

  return res.json();
};