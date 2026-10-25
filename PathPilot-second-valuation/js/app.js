// PathPilot dashboard bundle: storage + dsa tracker + main app logic
const store = {
  get(key, fallback = []) {
    try { return JSON.parse(localStorage.getItem(`pathpilot-${key}`)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    localStorage.setItem(`pathpilot-${key}`, JSON.stringify(value));
  }
};// ── Consensus 75 Problem Data (from dsatracker.tech) ──
// 75 problems that appear in all three sheets: Apna College, Love Babbar 450, Striver A2Z
const PROBLEMS = [
  // ── Arrays (13) ──
  { id: 1,  name: "Best Time to Buy and Sell Stock",      topic: "Arrays",            difficulty: "Easy",   url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/" },
  { id: 2,  name: "Majority Element",                     topic: "Arrays",            difficulty: "Easy",   url: "https://leetcode.com/problems/majority-element/description/" },
  { id: 3,  name: "Merge Sorted Arrays",                  topic: "Arrays",            difficulty: "Easy",   url: "https://leetcode.com/problems/merge-sorted-array/description/" },
  { id: 4,  name: "Sort an Array of 0s 1s and 2s",        topic: "Arrays",            difficulty: "Easy",   url: "https://leetcode.com/problems/sort-colors/description/" },
  { id: 5,  name: "Two Sum",                              topic: "Arrays",            difficulty: "Easy",   url: "https://leetcode.com/problems/two-sum/description/" },
  { id: 6,  name: "3Sum",                                 topic: "Arrays",            difficulty: "Medium", url: "https://leetcode.com/problems/3sum/description/" },
  { id: 7,  name: "Container With Most Water",            topic: "Arrays",            difficulty: "Medium", url: "https://leetcode.com/problems/container-with-most-water/description/" },
  { id: 8,  name: "Count Subarrays with Given Sum",       topic: "Arrays",            difficulty: "Medium", url: "https://leetcode.com/problems/subarray-sum-equals-k/description/" },
  { id: 9,  name: "Find the Longest Consecutive Sequence",topic: "Arrays",            difficulty: "Medium", url: "https://leetcode.com/problems/longest-consecutive-sequence/description/" },
  { id: 10, name: "Maximum Subarray",                     topic: "Arrays",            difficulty: "Medium", url: "https://leetcode.com/problems/maximum-subarray/description/" },
  { id: 11, name: "Product of Array Except Self",         topic: "Arrays",            difficulty: "Medium", url: "https://leetcode.com/problems/product-of-array-except-self/description/" },
  { id: 12, name: "Sort Colors",                          topic: "Arrays",            difficulty: "Medium", url: "https://leetcode.com/problems/sort-colors/description/" },
  { id: 13, name: "Trapping Rain Water",                  topic: "Arrays",            difficulty: "Hard",   url: "https://leetcode.com/problems/trapping-rain-water/description/" },

  // ── Binary Search (2) ──
  { id: 14, name: "Binary Search",                        topic: "Binary Search",     difficulty: "Easy",   url: "https://leetcode.com/problems/binary-search/description/" },
  { id: 15, name: "Sqrt(x)",                              topic: "Binary Search",     difficulty: "Easy",   url: "https://leetcode.com/problems/sqrtx/description/" },

  // ── Binary Trees (12) ──
  { id: 16, name: "Balanced Binary Tree",                 topic: "Binary Trees",      difficulty: "Easy",   url: "https://leetcode.com/problems/balanced-binary-tree/description/" },
  { id: 17, name: "Binary Tree Inorder Traversal",        topic: "Binary Trees",      difficulty: "Easy",   url: "https://leetcode.com/problems/binary-tree-inorder-traversal/description/" },
  { id: 18, name: "Binary Tree Postorder Traversal",      topic: "Binary Trees",      difficulty: "Easy",   url: "https://leetcode.com/problems/binary-tree-postorder-traversal/description/" },
  { id: 19, name: "Binary Tree Preorder Traversal",       topic: "Binary Trees",      difficulty: "Easy",   url: "https://leetcode.com/problems/binary-tree-preorder-traversal/description/" },
  { id: 20, name: "Diameter of Binary Tree",              topic: "Binary Trees",      difficulty: "Easy",   url: "https://leetcode.com/problems/diameter-of-binary-tree/description/" },
  { id: 21, name: "Invert Binary Tree",                   topic: "Binary Trees",      difficulty: "Easy",   url: "https://leetcode.com/problems/invert-binary-tree/description/" },
  { id: 22, name: "Maximum Depth of Binary Tree",         topic: "Binary Trees",      difficulty: "Easy",   url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/description/" },
  { id: 23, name: "Same Tree",                            topic: "Binary Trees",      difficulty: "Easy",   url: "https://leetcode.com/problems/same-tree/description/" },
  { id: 24, name: "Symmetric Tree",                       topic: "Binary Trees",      difficulty: "Easy",   url: "https://leetcode.com/problems/symmetric-tree/description/" },
  { id: 25, name: "Binary Tree Level Order Traversal",    topic: "Binary Trees",      difficulty: "Medium", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/description/" },
  { id: 26, name: "Construct Binary Tree from Preorder and Inorder", topic: "Binary Trees", difficulty: "Medium", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/" },
  { id: 27, name: "Lowest Common Ancestor of Binary Tree",topic: "Binary Trees",      difficulty: "Medium", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/" },

  // ── BST (2) ──
  { id: 28, name: "Lowest Common Ancestor of a BST",      topic: "BST",               difficulty: "Medium", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/" },
  { id: 29, name: "Validate Binary Search Tree",          topic: "BST",               difficulty: "Medium", url: "https://leetcode.com/problems/validate-binary-search-tree/description/" },

  // ── Backtracking (6) ──
  { id: 30, name: "Combination Sum",                      topic: "Backtracking",      difficulty: "Medium", url: "https://leetcode.com/problems/combination-sum/description/" },
  { id: 31, name: "Letter Combinations of a Phone Number",topic: "Backtracking",      difficulty: "Medium", url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/" },
  { id: 32, name: "Permutations",                         topic: "Backtracking",      difficulty: "Medium", url: "https://leetcode.com/problems/permutations/description/" },
  { id: 33, name: "Rat in a Maze",                        topic: "Backtracking",      difficulty: "Medium", url: "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1" },
  { id: 34, name: "Subsets",                              topic: "Backtracking",      difficulty: "Medium", url: "https://leetcode.com/problems/subsets/description/" },
  { id: 35, name: "N-Queens",                             topic: "Backtracking",      difficulty: "Hard",   url: "https://leetcode.com/problems/n-queens/description/" },

  // ── Bit Manipulation (2) ──
  { id: 36, name: "Missing Number",                       topic: "Bit Manipulation",  difficulty: "Easy",   url: "https://leetcode.com/problems/missing-number/description/" },
  { id: 37, name: "Single Number",                        topic: "Bit Manipulation",  difficulty: "Easy",   url: "https://leetcode.com/problems/single-number/description/" },

  // ── Dynamic Programming (8) ──
  { id: 38, name: "Climbing Stairs",                      topic: "Dynamic Programming", difficulty: "Easy",   url: "https://leetcode.com/problems/climbing-stairs/description/" },
  { id: 39, name: "0-1 Knapsack Problem",                 topic: "Dynamic Programming", difficulty: "Medium", url: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1" },
  { id: 40, name: "Coin Change",                          topic: "Dynamic Programming", difficulty: "Medium", url: "https://leetcode.com/problems/coin-change/description/" },
  { id: 41, name: "House Robber",                         topic: "Dynamic Programming", difficulty: "Medium", url: "https://leetcode.com/problems/house-robber/description/" },
  { id: 42, name: "Jump Game",                            topic: "Dynamic Programming", difficulty: "Medium", url: "https://leetcode.com/problems/jump-game/description/" },
  { id: 43, name: "Longest Common Subsequence",           topic: "Dynamic Programming", difficulty: "Medium", url: "https://leetcode.com/problems/longest-common-subsequence/description/" },
  { id: 44, name: "Longest Increasing Subsequence",       topic: "Dynamic Programming", difficulty: "Medium", url: "https://leetcode.com/problems/longest-increasing-subsequence/description/" },
  { id: 45, name: "Unique Paths",                         topic: "Dynamic Programming", difficulty: "Medium", url: "https://leetcode.com/problems/unique-paths/description/" },

  // ── Graph (3) ──
  { id: 46, name: "Flood Fill",                           topic: "Graph",             difficulty: "Easy",   url: "https://leetcode.com/problems/flood-fill/description/" },
  { id: 47, name: "Number of Islands",                    topic: "Graph",             difficulty: "Medium", url: "https://leetcode.com/problems/number-of-islands/description/" },
  { id: 48, name: "Rotting Oranges",                      topic: "Graph",             difficulty: "Medium", url: "https://leetcode.com/problems/rotting-oranges/description/" },

  // ── Greedy (3) ──
  { id: 49, name: "Activity Selection Problem",           topic: "Greedy",            difficulty: "Medium", url: "https://www.geeksforgeeks.org/problems/activity-selection-1587115620/1" },
  { id: 50, name: "Fractional Knapsack",                  topic: "Greedy",            difficulty: "Medium", url: "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1" },
  { id: 51, name: "Job Sequencing Problem",               topic: "Greedy",            difficulty: "Medium", url: "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1" },

  // ── Heap (1) ──
  { id: 52, name: "Top K Frequent Elements",              topic: "Heap",              difficulty: "Medium", url: "https://leetcode.com/problems/top-k-frequent-elements/description/" },

  // ── Intervals (1) ──
  { id: 53, name: "Merge Intervals",                      topic: "Intervals",         difficulty: "Medium", url: "https://leetcode.com/problems/merge-intervals/description/" },

  // ── Linked List (7) ──
  { id: 54, name: "Linked List Cycle",                    topic: "Linked List",       difficulty: "Easy",   url: "https://leetcode.com/problems/linked-list-cycle/description/" },
  { id: 55, name: "Merge Two Sorted Lists",               topic: "Linked List",       difficulty: "Easy",   url: "https://leetcode.com/problems/merge-two-sorted-lists/description/" },
  { id: 56, name: "Middle of Linked List",                topic: "Linked List",       difficulty: "Easy",   url: "https://leetcode.com/problems/middle-of-the-linked-list/description/" },
  { id: 57, name: "Palindrome Linked List",               topic: "Linked List",       difficulty: "Easy",   url: "https://leetcode.com/problems/palindrome-linked-list/description/" },
  { id: 58, name: "Reverse Linked List",                  topic: "Linked List",       difficulty: "Easy",   url: "https://leetcode.com/problems/reverse-linked-list/description/" },
  { id: 59, name: "Add Two Numbers",                      topic: "Linked List",       difficulty: "Medium", url: "https://leetcode.com/problems/add-two-numbers/description/" },
  { id: 60, name: "Remove Nth Node From End of List",     topic: "Linked List",       difficulty: "Medium", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/" },

  // ── Math (1) ──
  { id: 61, name: "Sieve of Eratosthenes",                topic: "Math",              difficulty: "Medium", url: "https://www.geeksforgeeks.org/problems/sieve-of-eratosthenes5242/1" },

  // ── Queue (1) ──
  { id: 62, name: "Implement Queue using Stacks",         topic: "Queue",             difficulty: "Easy",   url: "https://leetcode.com/problems/implement-queue-using-stacks/description/" },

  // ── Sorting (2) ──
  { id: 63, name: "Merge Sort",                           topic: "Sorting",           difficulty: "Medium", url: "https://www.geeksforgeeks.org/problems/merge-sort/1" },
  { id: 64, name: "Quick Sort",                           topic: "Sorting",           difficulty: "Medium", url: "https://www.geeksforgeeks.org/problems/quick-sort/1" },

  // ── Stack (5) ──
  { id: 65, name: "Valid Parentheses",                    topic: "Stack",             difficulty: "Easy",   url: "https://leetcode.com/problems/valid-parentheses/description/" },
  { id: 66, name: "Generate Parentheses",                 topic: "Stack",             difficulty: "Medium", url: "https://leetcode.com/problems/generate-parentheses/description/" },
  { id: 67, name: "Min Stack",                            topic: "Stack",             difficulty: "Medium", url: "https://leetcode.com/problems/min-stack/description/" },
  { id: 68, name: "Stock Span Problem",                   topic: "Stack",             difficulty: "Medium", url: "https://www.geeksforgeeks.org/problems/stock-span-problem-1587115621/1" },
  { id: 69, name: "Largest Rectangle in Histogram",       topic: "Stack",             difficulty: "Hard",   url: "https://leetcode.com/problems/largest-rectangle-in-histogram/description/" },

  // ── Strings (4) ──
  { id: 70, name: "Group Anagrams",                       topic: "Strings",           difficulty: "Medium", url: "https://leetcode.com/problems/group-anagrams/description/" },
  { id: 71, name: "Longest Palindromic Substring",        topic: "Strings",           difficulty: "Medium", url: "https://leetcode.com/problems/longest-palindromic-substring/description/" },
  { id: 72, name: "Longest Substring Without Repeating Characters", topic: "Strings", difficulty: "Medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/description/" },
  { id: 73, name: "Reverse Words in a String",            topic: "Strings",           difficulty: "Medium", url: "https://leetcode.com/problems/reverse-words-in-a-string/description/" },

  // ── Trie (1) ──
  { id: 74, name: "Implement Trie (Prefix Tree)",         topic: "Trie",              difficulty: "Medium", url: "https://leetcode.com/problems/implement-trie-prefix-tree/description/" },

  // ── Two Pointers (1) ──
  { id: 75, name: "Two Sum II - Sorted Array",            topic: "Two Pointers",      difficulty: "Medium", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/" },
];

// ── State ──
let solved = store.get("dsa_solved", []);           // array of IDs
let solvedTimes = store.get("dsa_solved_times", {}); // { id: timestamp }
let problemNotes = store.get("dsa_notes", {});       // { id: "note text" }

// ── DOM refs ──
const container    = document.getElementById("problemContainer");
const searchInput  = document.getElementById("searchInput");
const diffFilter   = document.getElementById("diffFilter");
const statusFilter = document.getElementById("statusFilter");
const resetBtn     = document.getElementById("resetBtn");
const expandAllBtn = document.getElementById("expandAllBtn");
const dqpViewProgressBtn = document.getElementById("dqpViewProgressBtn");

// ── Helpers ──
function isSolved(id) { return solved.includes(id); }

function timeAgo(ts) {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60)    return "just now";
  if (seconds < 3600)  return Math.floor(seconds / 60) + "m ago";
  if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago";
  const days = Math.floor(seconds / 86400);
  if (days === 1) return "yesterday";
  if (days < 7)   return days + "d ago";
  if (days < 30)  return Math.floor(days / 7) + "w ago";
  return new Date(ts).toLocaleDateString();
}

function toggleSolved(id) {
  if (isSolved(id)) {
    solved = solved.filter(x => x !== id);
    delete solvedTimes[id];
  } else {
    solved.push(id);
    solvedTimes[id] = Date.now();
  }
  store.set("dsa_solved", solved);
  store.set("dsa_solved_times", solvedTimes);
  window.dispatchEvent(new CustomEvent("pathpilot:data-changed",{detail:{source:"dsa",solved:solved.length}}));
  updateStats();
  // Update the specific row without full re-render
  const row = document.getElementById(`prob-row-${id}`);
  if (row) {
    const nowSolved = isSolved(id);
    row.classList.toggle("solved", nowSolved);
    const cb = row.querySelector(".prob-check");
    if (cb) {
      cb.checked = nowSolved;
      cb.setAttribute("aria-checked", nowSolved ? "true" : "false");
    }
    const timeEl = row.querySelector(".solve-time");
    if (timeEl) timeEl.textContent = nowSolved ? timeAgo(solvedTimes[id]) : "";
  }
  updateTopicProgress();
  renderRecentlySolved();
  if (window.showToast) {
    window.showToast(isSolved(id) ? "Marked as solved" : "Marked as unsolved");
  }
}

function saveNote(id, text) {
  if (text.trim()) {
    problemNotes[id] = text.trim();
  } else {
    delete problemNotes[id];
  }
  store.set("dsa_notes", problemNotes);
}

function getTopics() {
  return [...new Set(PROBLEMS.map(p => p.topic))];
}

function getFilteredProblems() {
  const q    = searchInput.value.toLowerCase().trim();
  const diff = diffFilter.value;
  const stat = statusFilter.value;
  return PROBLEMS.filter(p => {
    if (q && !p.name.toLowerCase().includes(q) && !p.topic.toLowerCase().includes(q)) return false;
    if (diff !== "All" && p.difficulty !== diff) return false;
    if (stat === "Solved"   && !isSolved(p.id)) return false;
    if (stat === "Unsolved" &&  isSolved(p.id)) return false;
    return true;
  });
}

// ── Stats ──
function updateStats() {
  const total  = solved.length;
  const easy   = PROBLEMS.filter(p => p.difficulty === "Easy"   && isSolved(p.id)).length;
  const medium = PROBLEMS.filter(p => p.difficulty === "Medium" && isSolved(p.id)).length;
  const hard   = PROBLEMS.filter(p => p.difficulty === "Hard"   && isSolved(p.id)).length;
  const pct    = Math.round((total / 75) * 100);

  document.getElementById("totalSolved").textContent  = total;
  document.getElementById("easySolved").textContent   = easy;
  document.getElementById("mediumSolved").textContent = medium;
  document.getElementById("hardSolved").textContent   = hard;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressLabel").textContent = pct + "% complete";

  // Compact quick-progress strip
  const dqpSolved = document.getElementById("dqpSolved");
  const dqpPct = document.getElementById("dqpPct");
  const dqpRing = document.getElementById("dqpRing");
  const dqpBarFill = document.getElementById("dqpBarFill");
  const dqpEasy = document.getElementById("dqpEasy");
  const dqpMedium = document.getElementById("dqpMedium");
  const dqpHard = document.getElementById("dqpHard");
  if (dqpSolved) dqpSolved.textContent = total;
  if (dqpPct) dqpPct.textContent = pct + "%";
  if (dqpRing) dqpRing.style.setProperty("--dqp-pct", pct + "%");
  if (dqpBarFill) dqpBarFill.style.width = pct + "%";
  if (dqpEasy) dqpEasy.textContent = easy;
  if (dqpMedium) dqpMedium.textContent = medium;
  if (dqpHard) dqpHard.textContent = hard;

  // Cache counts for dashboard cross-reference
  store.set("dsa_easy_count", easy);
  store.set("dsa_medium_count", medium);
  store.set("dsa_hard_count", hard);
}

// Update per-topic mini progress bars
function updateTopicProgress() {
  getTopics().forEach(topic => {
    const topicProbs   = PROBLEMS.filter(p => p.topic === topic);
    const topicSolved  = topicProbs.filter(p => isSolved(p.id)).length;
    const pct          = topicProbs.length ? Math.round((topicSolved / topicProbs.length) * 100) : 0;
    const fill  = document.getElementById(`mini-fill-${slug(topic)}`);
    const count = document.getElementById(`mini-count-${slug(topic)}`);
    if (fill)  fill.style.width   = pct + "%";
    if (count) count.textContent  = `${topicSolved}/${topicProbs.length}`;
  });
}

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, "-"); }

// ── Recently Solved ──
function renderRecentlySolved() {
  const recentContainer = document.getElementById("recentlySolved");
  if (!recentContainer) return;

  // Get the 5 most recently solved problems by timestamp
  const recentIds = Object.entries(solvedTimes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id]) => Number(id));

  if (!recentIds.length) {
    recentContainer.innerHTML = `<div class="no-results" style="padding: 24px;"><p>No problems solved yet. Start checking them off!</p></div>`;
    return;
  }

  recentContainer.innerHTML = recentIds.map(id => {
    const p = PROBLEMS.find(prob => prob.id === id);
    if (!p) return "";
    return `<div class="recent-item">
      <div class="recent-info">
        <a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.name}</a>
        <span class="recent-meta">${p.topic} · <span class="diff-badge ${p.difficulty.toLowerCase()}">${p.difficulty}</span></span>
      </div>
      <span class="solve-time">${timeAgo(solvedTimes[id])}</span>
    </div>`;
  }).join("");
}

// ── Topic Chart ──
function renderTopicChart() {
  const canvas = document.getElementById("topicChart");
  if (!canvas || typeof Chart === "undefined") return;

  const topics = getTopics();
  const labels = topics;
  const data = topics.map(topic => {
    const topicProbs = PROBLEMS.filter(p => p.topic === topic);
    const topicSolved = topicProbs.filter(p => isSolved(p.id)).length;
    return topicProbs.length ? Math.round((topicSolved / topicProbs.length) * 100) : 0;
  });

  const isDark = document.body.classList.contains("dark");
  const textColor = isDark ? "#9ab2a7" : "#628d79";
  const gridColor = isDark ? "#554733" : "#f0eae2";

  // Color bars based on completion percentage
  const bgColors = data.map(pct => {
    if (pct === 100) return "rgba(5,150,105, 0.7)";
    if (pct >= 50)   return "rgba(235,156,37, 0.7)";
    if (pct > 0)     return "rgba(217,133,6, 0.7)";
    return "rgba(98,141,121, 0.25)";
  });

  new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "% Complete",
        data,
        backgroundColor: bgColors,
        borderRadius: 4,
        barThickness: 18,
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.raw}% complete`
          }
        }
      },
      scales: {
        x: {
          min: 0, max: 100,
          grid: { color: gridColor },
          ticks: { color: textColor, callback: v => v + "%" }
        },
        y: {
          grid: { display: false },
          ticks: { color: textColor, font: { size: 12 } }
        }
      }
    }
  });
}

// ── Note Modal ──
function openNoteModal(id) {
  const problem = PROBLEMS.find(p => p.id === id);
  if (!problem) return;

  // Remove existing modal if any
  const existing = document.getElementById("noteModal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "noteModal";
  modal.className = "note-modal-overlay";
  modal.innerHTML = `
    <div class="note-modal">
      <div class="note-modal-header">
        <div>
          <h3>${problem.name}</h3>
          <span class="diff-badge ${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
        </div>
        <button class="note-modal-close" aria-label="Close">&times;</button>
      </div>
      <textarea class="note-modal-textarea" placeholder="Write your approach, key insight, or time complexity notes here…">${problemNotes[id] || ""}</textarea>
      <div class="note-modal-actions">
        <button class="btn btn-secondary btn-small note-modal-cancel">Cancel</button>
        <button class="btn btn-primary btn-small note-modal-save">Save Note</button>
      </div>
    </div>`;

  document.body.appendChild(modal);

  // Focus textarea
  const textarea = modal.querySelector(".note-modal-textarea");
  setTimeout(() => textarea.focus(), 50);

  // Close handlers
  const close = () => modal.remove();
  modal.querySelector(".note-modal-close").addEventListener("click", close);
  modal.querySelector(".note-modal-cancel").addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });

  // Save handler
  modal.querySelector(".note-modal-save").addEventListener("click", () => {
    saveNote(id, textarea.value);
    // Update the note icon in the row
    const noteBtn = document.querySelector(`#prob-row-${id} .note-btn`);
    if (noteBtn) noteBtn.classList.toggle("has-note", !!problemNotes[id]);
    close();
    if (window.showToast) window.showToast("Note saved");
  });

  // Ctrl+Enter to save
  textarea.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      modal.querySelector(".note-modal-save").click();
    }
  });
}

// ── Render ──
function render() {
  const filtered = getFilteredProblems();
  container.innerHTML = "";

  const countHead = document.getElementById("dsaProblemsCount");
  if (countHead) countHead.textContent = `${filtered.length} problem${filtered.length === 1 ? "" : "s"} in view`;

  if (!filtered.length) {
    container.innerHTML = `<div class="no-results"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg><p>No problems match your filters.</p></div>`;
    return;
  }

  // Group by topic, but only show topics that have visible problems
  const topics = [...new Set(filtered.map(p => p.topic))];

  topics.forEach(topic => {
    const topicProbs   = PROBLEMS.filter(p => p.topic === topic);    // all for progress
    const visibleProbs = filtered.filter(p => p.topic === topic);    // filtered for display
    const topicSolved  = topicProbs.filter(p => isSolved(p.id)).length;
    const pct          = topicProbs.length ? Math.round((topicSolved / topicProbs.length) * 100) : 0;
    const topicSlug    = slug(topic);

    const group = document.createElement("div");
    group.className = "topic-group";

    const header = document.createElement("div");
    header.className = "topic-header";
    header.setAttribute("role", "button");
    header.setAttribute("aria-expanded", "true");
    header.setAttribute("tabindex", "0");
    header.innerHTML = `
      <div class="topic-header-left">
        <h3>${topic}</h3>
        <span class="topic-badge">${visibleProbs.length}</span>
      </div>
      <div class="topic-progress-wrap">
        <span class="topic-count" id="mini-count-${topicSlug}">${topicSolved}/${topicProbs.length}</span>
        <div class="topic-mini-bar"><div class="topic-mini-fill" id="mini-fill-${topicSlug}" style="width:${pct}%"></div></div>
        <svg class="topic-chevron open" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>`;

    const rows = document.createElement("div");
    rows.className = "problem-rows open";

    visibleProbs.forEach(p => {
      const row = document.createElement("div");
      row.className = `problem-row${isSolved(p.id) ? " solved" : ""}`;
      row.id = `prob-row-${p.id}`;
      const hasNote = !!problemNotes[p.id];
      const solveTimeText = isSolved(p.id) && solvedTimes[p.id] ? timeAgo(solvedTimes[p.id]) : "";
      row.innerHTML = `
        <input type="checkbox" class="prob-check" id="cb-${p.id}"
          ${isSolved(p.id) ? "checked" : ""}
          aria-label="Mark ${p.name} as solved">
        <label class="problem-name" for="cb-${p.id}">
          <a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.name}</a>
        </label>
        <span class="solve-time">${solveTimeText}</span>
        <button class="dsa-code-btn" data-code-id="${p.id}" type="button" title="Solve in In-Browser Code IDE">⚡ Solve</button>
        <button class="note-btn${hasNote ? " has-note" : ""}" data-note-id="${p.id}" aria-label="Add note for ${p.name}" title="${hasNote ? "Edit note" : "Add note"}">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        </button>
        <span class="diff-badge ${p.difficulty.toLowerCase()}">${p.difficulty}</span>`;

      // Checkbox change
      row.querySelector(".prob-check").addEventListener("change", () => toggleSolved(p.id));
      // Code Solve button
      const codeBtn = row.querySelector(".dsa-code-btn");
      if (codeBtn) {
        codeBtn.addEventListener("click", e => {
          e.stopPropagation();
          openDsaRunner(p.id);
        });
      }
      // Note button
      row.querySelector(".note-btn").addEventListener("click", e => {
        e.stopPropagation();
        openNoteModal(p.id);
      });
      rows.appendChild(row);
    });

    // Toggle collapse
    header.addEventListener("click", () => {
      const isOpen = rows.classList.toggle("open");
      header.querySelector(".topic-chevron").classList.toggle("open", isOpen);
      header.setAttribute("aria-expanded", isOpen);
    });
    header.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); header.click(); }
    });

    group.appendChild(header);
    group.appendChild(rows);
    container.appendChild(group);
  });
}

// ── Reset ──
resetBtn.addEventListener("click", () => {
  if (!confirm("Reset ALL progress? This cannot be undone.")) return;
  solved = [];
  solvedTimes = {};
  problemNotes = {};
  store.set("dsa_solved", solved);
  store.set("dsa_solved_times", solvedTimes);
  store.set("dsa_notes", problemNotes);
  updateStats();
  render();
  renderRecentlySolved();
  renderTopicChart();
  if (window.showToast) window.showToast("Progress reset", "error");
});

// ── Expand / Collapse all topics ──
if (expandAllBtn) {
  expandAllBtn.addEventListener("click", () => {
    const shouldExpand = expandAllBtn.textContent.trim() === "Expand All";
    document.querySelectorAll("#problemContainer .problem-rows").forEach(rows => rows.classList.toggle("open", shouldExpand));
    document.querySelectorAll("#problemContainer .topic-chevron").forEach(chev => chev.classList.toggle("open", shouldExpand));
    document.querySelectorAll("#problemContainer .topic-header").forEach(h => h.setAttribute("aria-expanded", shouldExpand));
    expandAllBtn.textContent = shouldExpand ? "Collapse All" : "Expand All";
  });
}

// ── Jump to full DSA Progress page ──
if (dqpViewProgressBtn) {
  dqpViewProgressBtn.addEventListener("click", () => {
    if (typeof window.switchPage === "function") window.switchPage("dsaProgress");
  });
}

// ── Filter listeners ──
searchInput.addEventListener("input",  render);
diffFilter.addEventListener("change",  render);
statusFilter.addEventListener("change", render);

// ── Init ──
updateStats();
render();
renderRecentlySolved();

// Chart.js loads async from CDN, wait for it
if (typeof Chart !== "undefined") {
  renderTopicChart();
} else {
  // Poll for Chart.js availability (CDN might load after this script)
  const chartInterval = setInterval(() => {
    if (typeof Chart !== "undefined") {
      clearInterval(chartInterval);
      renderTopicChart();
    }
  }, 200);
  // Stop polling after 10s
  setTimeout(() => clearInterval(chartInterval), 10000);
}
/* quietScrollbarController: show scroll thumbs only while the user scrolls */
(function quietScrollbarController(){
  const arm=(el)=>{
    if(!el) return;
    let timer=null;
    const show=()=>{
      el.classList.add('is-scrolling');
      clearTimeout(timer);
      timer=setTimeout(()=>el.classList.remove('is-scrolling'),650);
    };
    el.addEventListener('scroll',show,{passive:true});
    el.addEventListener('wheel',show,{passive:true});
    el.addEventListener('touchmove',show,{passive:true});
  };
  document.addEventListener('DOMContentLoaded',()=>{
    arm(document.documentElement);
    arm(document.querySelector('.sidebar.ppsb .ppsb-nav'));
  });
})();

function uid(){ return (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'id-' + Date.now() + '-' + Math.random().toString(16).slice(2); }
const storageKey='pathpilot_inner_app_state_v1';
const authKey='pathpilot_inner_auth_v1';
const defaultState={
  settings:{toasts:true,autosave:true,profileName:'',accent:'#2563eb',soundAlerts:true,browserNotifications:true,studyGoalHours:2,pomodoroGoalCount:4},
  tasks:[
    {id:uid(),title:'Revise DBMS unit 2',desc:'Finish normalization and joins',due:'',priority:'high',done:false,subject:'DBMS',completedAt:null},
    {id:uid(),title:'Complete project report',desc:'Write intro and methodology',due:'',priority:'medium',done:false,subject:'General',completedAt:null}
  ],
  notes:[{id:uid(),title:'Welcome',body:'Use this dashboard to organize tasks, notes, exams, and study progress efficiently.',createdAt:Date.now(),pinned:false}],
  calendarDate:new Date().toISOString(),
  timerSeconds:1500,timerRunning:false,timerMode:1500,focusSessions:[],
  timetable:[{id:uid(),name:'Math',day:'Mon',time:'9:00 - 10:00',color:'#2563eb'}],
  grades:[{id:uid(),subject:'Math',score:84,credits:4},{id:uid(),subject:'DBMS',score:77,credits:3}],
  habits:[{id:uid(),name:'Drink Water',icon:'💧',target:5,days:[false,false,false,false,false,false,false]}],
  flashcards:[{id:uid(),deck:'DBMS',question:'What is normalization?',answer:'Organizing data to reduce redundancy.'}],
  exams:[{id:uid(),name:'Mid Sem',subject:'OS',date:new Date(Date.now()+7*86400000).toISOString().slice(0,10)}],
  goals:[{id:uid(),title:'Complete Syllabus',target:100,progress:45}],
  internships:[],
  ui:{selectedDeck:'DBMS',flashIndex:0,flashFlipped:false}
};
const VALID_PAGES=['dashboard','analytics','timetable','calendar','grades','habits','dsa','dsaProgress','flashcards','exams','internships','goals','ai','tasks','notes','focus','settings','resume','interviews','portfolio'];
const INTERN_STATUSES={wishlist:'Wishlist',applied:'Applied',oa:'OA',interview:'Interview',offer:'Offer',rejected:'Rejected'};
let state=loadState();
let timerInterval=null;
let calendarCursor=new Date(state.calendarDate || new Date().toISOString());
let priorityChart=null,gradeChart=null,weeklyStudyHoursChart=null,tasksCompletedChart=null,subjectChart=null;
function clone(obj){ return JSON.parse(JSON.stringify(obj)); }
function mergeState(base,incoming){
  const merged=clone(base);
  Object.keys(merged).forEach(key=>{
    if(Array.isArray(merged[key])) merged[key]=Array.isArray(incoming?.[key]) ? incoming[key] : merged[key];
    else if(typeof merged[key]==='object' && merged[key]!==null) merged[key]={...merged[key],...(incoming?.[key]||{})};
    else if(incoming && key in incoming) merged[key]=incoming[key];
  });
  return merged;
}
function loadState(){ try{ const raw=localStorage.getItem(storageKey); return raw ? mergeState(defaultState,JSON.parse(raw)) : clone(defaultState); }catch(e){ return clone(defaultState); } }
function saveState(){ if(state.settings?.autosave!==false) localStorage.setItem(storageKey,JSON.stringify(state)); }
function loadAuth(){
  try{
    let u=JSON.parse(localStorage.getItem('pathpilot-current-user')||'null');
    const loggedIn=localStorage.getItem('pathpilotLoggedIn');
    if(!u && loggedIn!=='false'){
      u={name:'Alex Rivera',email:'alex.rivera@cs.university.edu'};
      localStorage.setItem('pathpilot-current-user',JSON.stringify(u));
      localStorage.setItem('pathpilotLoggedIn','true');
    }
    return u && localStorage.getItem('pathpilotLoggedIn')==='true' ? {loggedIn:true,name:u.name||'Student',email:u.email||''} : null;
  }catch(e){return null;}
}
function saveAuth(data){
  localStorage.setItem('pathpilot-current-user',JSON.stringify(data));
  localStorage.setItem('pathpilotLoggedIn','true');
}
function clearAuth(){
  localStorage.removeItem('pathpilot-current-user');
  localStorage.setItem('pathpilotLoggedIn','false');
}
const usersKey = 'pathpilot_users';

function loadUsers(){
  try{
    return JSON.parse(localStorage.getItem(usersKey)) || [];
  }catch{
    return [];
  }
}

function saveUsers(users){
  localStorage.setItem(usersKey, JSON.stringify(users));
}
function qs(id){ return document.getElementById(id); }
function escapeHtml(str=''){ return String(str).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }
function escapeAttr(str=''){ return String(str).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function toast(msg,type='success'){
  if(state.settings?.toasts===false) return;
  let el=qs('toast');
  if(!el){
    el=document.createElement('div');
    el.id='toast';
    el.className='toast';
    document.body.appendChild(el);
  }
  const normalized=String(type||'success').toLowerCase();
  const isError=['error','danger','failed'].includes(normalized);
  const isInfo=['info','notice'].includes(normalized);
  const icon=isError?'!':isInfo?'i':'✓';
  el.className=`toast ${isError?'toast-error':isInfo?'toast-info':'toast-success'}`;
  el.innerHTML=`<span class="toast-icon">${icon}</span><span class="toast-message">${escapeHtml(String(msg))}</span>`;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>el.classList.remove('show'),2200);
}
window.showToast=(msg,type='success')=>toast(msg,type);
function daysLeft(dateStr){ const today=new Date(); today.setHours(0,0,0,0); const d=new Date(dateStr+'T00:00:00'); return Math.ceil((d-today)/86400000); }
function formatDate(dateStr){ if(!dateStr) return 'No due date'; return new Date(dateStr+'T00:00:00').toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'}); }
function shadeHexColor(hex,percent){ const clean=String(hex).replace('#',''); const full=clean.length===3 ? clean.split('').map(c=>c+c).join('') : clean; const num=parseInt(full,16); const amt=Math.round(2.55*percent); const r=Math.max(0,Math.min(255,(num>>16)+amt)); const g=Math.max(0,Math.min(255,((num>>8)&255)+amt)); const b=Math.max(0,Math.min(255,(num&255)+amt)); return '#' + (0x1000000 + r*0x10000 + g*0x100 + b).toString(16).slice(1); }
function applyAccentColor(color){ const accent=color || '#2563eb'; document.documentElement.style.setProperty('--primary',accent); document.documentElement.style.setProperty('--primary-2',shadeHexColor(accent,-10)); document.documentElement.style.setProperty('--primary-soft',shadeHexColor(accent,38)); }
function getTimeStartLabel(time=''){ const match=String(time).match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i); if(!match) return ''; let hour=Number(match[1]); const minute=(match[2]||'00').padStart(2,'0'); const suffix=(match[3]||'').toLowerCase(); if(suffix==='pm' && hour<12) hour+=12; if(suffix==='am' && hour===12) hour=0; return `${hour}:${minute}`; }

function renderAuth(){
  const auth=loadAuth();
  if(!auth){ location.replace('login.html'); return false; }
  qs('authRoot').innerHTML='';
  qs('appRoot').classList.remove('hidden');
  if(qs('todayDatePill')) qs('todayDatePill').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'short'});
if(!state.settings.profileName&&auth.name){ state.settings.profileName=auth.name; saveState(); }
}

function openConfirmModal(title,message,onConfirm){
  closeConfirmModal();
  const wrap=document.createElement('div');
  wrap.className='modal-backdrop';
  wrap.id='confirmModal';
  wrap.innerHTML=`<div class="modal"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(message)}</p><div class="modal-actions"><button class="btn ghost" id="modalCancelBtn">Cancel</button><button class="btn danger" id="modalConfirmBtn">Confirm</button></div></div>`;
  document.body.appendChild(wrap);
  if(qs('modalCancelBtn')) qs('modalCancelBtn').onclick=closeConfirmModal;
  if(qs('modalConfirmBtn')) qs('modalConfirmBtn').onclick=()=>{ onConfirm(); };
}
function closeConfirmModal(){ const modal=qs('confirmModal'); if(modal) modal.remove(); }

function closeMobileNav(){
  document.body.classList.remove('nav-open');
  qs('ppNavOverlay')?.classList.add('hidden');
}
function switchPage(name){
  if(name) name = String(name).replace(/^#/, '').replace(/Page$/, '');
  if(!VALID_PAGES.includes(name)) name='dashboard';
  closeMobileNav();
  try {
    if(window.location.hash !== '#' + name){
      history.replaceState(null, '', '#' + name);
    }
  }catch(e){}

  if(name==='dashboard'){
    const previous=Number.isInteger(state.dashboardQuoteIndex)?state.dashboardQuoteIndex:-1;
    let next=Math.floor(Math.random()*DASH_QUOTES.length);
    if(DASH_QUOTES.length>1){
      while(next===previous) next=Math.floor(Math.random()*DASH_QUOTES.length);
    }
    state.dashboardQuoteIndex=next;
    // Update immediately when returning from Analytics/another section.
    renderQuote();
  }

  document.body.classList.toggle('dashboard-page-active', name==='dashboard');
  const topbar=qs('topbar');
  if(topbar) topbar.classList.toggle('dashboard-topbar', name==='dashboard');
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
  document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));
  const page=qs(name+'Page');
  const navBtn=document.querySelector(`.nav button[data-page="${name}"]`);
  if(page) page.classList.remove('hidden');
  if(navBtn) {
    navBtn.classList.add('active');
    try{ navBtn.scrollIntoView({block:'nearest',inline:'nearest'}); }catch(e){}
  }
  const map={
    dashboard:['Dashboard','Plan tasks, track progress, and organize academic work.'],
    tasks:['Tasks','Create, update, search, and complete academic tasks.'],
    notes:['Notes','Store and manage important study notes.'],
    calendar:['Calendar','View deadlines and important academic dates.'],
    focus:['Focus','Track focused study sessions with a timer.'],
    analytics:['Analytics','Review performance and progress across modules.'],
    timetable:['Timetable','Organize weekly subjects and class timings.'],
    grades:['Grades','Track marks and view academic summary.'],
    habits:['Habits','Maintain productive study habits consistently.'],
    flashcards:['Flashcards','Create decks and revise important topics.'],
    exams:['Exam Countdown','Monitor upcoming exams and deadlines.'],
    goals:['Goals','Track academic targets and completion progress.'],
    settings:['Your Profile','Build your student identity and collect milestones.'],
    dsa:['DSA','Solve, track, and review your placement-focused DSA problems.'],
    dsaProgress:['DSA Progress','Track your placement progress, streak, difficulty, and topic coverage.'],
    internships:['Internships','Track applications from wishlist to offer.'],
    ai:['AI Assistant','Your personal AI study tutor, planner, and quiz master.'],
    resume:['Resume & ATS','Build an ATS-optimized tech resume and scan against job descriptions.'],
    interviews:['Mock Interviews','Practice real-world behavioral and core technical interview questions with STAR feedback.'],
    portfolio:['Public Portfolio','Generate and showcase your verified student portfolio.']
  };
  if(qs('pageTitle') && map[name]) qs('pageTitle').textContent=map[name][0];
  if(qs('pageSubtitle') && map[name]) qs('pageSubtitle').textContent=map[name][1];
  if(name==='dashboard') { try{renderStudyHeatmap();}catch(e){} }
  if(name==='analytics') { renderCharts(); try{renderStudyHeatmap();}catch(e){} }
  if(name==='dsaProgress') renderDsaProgress();
  if(name==='internships') renderInternships();
  if(name==='resume') { try{renderResumeStudio();}catch(e){} }
  if(name==='interviews') { try{renderInterviews();}catch(e){} }
  if(name==='portfolio') { try{renderPortfolioStudio();}catch(e){} }
  if(location.hash!=='#'+name) history.replaceState(null,'','#'+name);
}


function renderDsaProgress(){
  const page=qs('dsaProgressPage');
  if(!page) return;

  const problems=(typeof PROBLEMS!=='undefined' && Array.isArray(PROBLEMS)) ? PROBLEMS : [];
  const solvedRaw=store.get('dsa_solved',[]);
  const solved=Array.isArray(solvedRaw) ? solvedRaw.map(Number) : [];
  const solvedSet=new Set(solved);
  const solvedTimes=store.get('dsa_solved_times',{}) || {};

  const total=problems.length || 75;
  const solvedCount=problems.filter(p=>solvedSet.has(Number(p.id))).length;
  const pct=total ? Math.round((solvedCount/total)*100) : 0;

  set2('dspSolvedHero',solvedCount);
  set2('dspSolvedStat',`${solvedCount}/${total}`);
  set2('dspSolvedMeta',`${solvedCount} problem${solvedCount===1?'':'s'} completed`);
  set2('dspOverallStat',`${pct}%`);
  set2('dspHeroPct',`${pct}%`);
  set2('dspProgressChip',`${pct}% complete`);
  const heroBar=qs('dspHeroBar');
  if(heroBar) heroBar.style.width=`${pct}%`;

  let heroSub='Start with one problem today and build your consistency.';
  if(pct>=100) heroSub='You completed the full sheet. Keep sharpening your weak areas.';
  else if(solvedCount>0) heroSub=`You have ${total-solvedCount} problem${total-solvedCount===1?'':'s'} left. Keep the momentum going.`;
  set2('dspHeroSub',heroSub);

  // Difficulty breakdown.
  const difficultyOrder=['Easy','Medium','Hard'];
  const difficultyTotals=difficultyOrder.reduce((acc,d)=>{
    acc[d]=problems.filter(p=>p.difficulty===d).length;
    return acc;
  },{});
  const difficultySolved=difficultyOrder.reduce((acc,d)=>{
    acc[d]=problems.filter(p=>p.difficulty===d && solvedSet.has(Number(p.id))).length;
    return acc;
  },{});
  const difficultyColors={Easy:'#238443',Medium:'#a66100',Hard:'#d83b20'};
  const diffHtml=difficultyOrder.map(d=>{
    const t=difficultyTotals[d]||0, s=difficultySolved[d]||0, p=t?Math.round(s/t*100):0;
    return `<div class="dsp-diff-row">
      <div class="dsp-diff-line"><strong style="color:${difficultyColors[d]}">${d}</strong><span>${s}/${t} · ${p}%</span></div>
      <div class="dsp-bar"><i style="width:${p}%;background:${difficultyColors[d]}"></i></div>
    </div>`;
  }).join('');
  if(qs('dspDifficultyRows')) qs('dspDifficultyRows').innerHTML=diffHtml;

  // Topic cards.
  const topicMap={};
  problems.forEach(p=>{
    const topic=p.topic||'Other';
    if(!topicMap[topic]) topicMap[topic]={total:0,solved:0};
    topicMap[topic].total++;
    if(solvedSet.has(Number(p.id))) topicMap[topic].solved++;
  });
  const topics=Object.entries(topicMap).sort((a,b)=>{
    const ap=a[1].total? a[1].solved/a[1].total:0;
    const bp=b[1].total? b[1].solved/b[1].total:0;
    return ap-bp || b[1].total-a[1].total;
  });
  if(qs('dspTopicGrid')){
    qs('dspTopicGrid').innerHTML=topics.map(([topic,v])=>{
      const p=v.total?Math.round(v.solved/v.total*100):0;
      return `<article class="dsp-topic-card card">
        <div class="dsp-topic-top"><h3>${escapeHtml(topic)}</h3><strong>${p}%</strong></div>
        <div class="dsp-topic-mini-bar"><i style="width:${p}%"></i></div>
        <span>${v.solved} / ${v.total} solved</span>
      </article>`;
    }).join('');
  }

  // Best next focus = weakest non-complete topics, then largest topic.
  const weak=topics.filter(([,v])=>v.solved<v.total).slice(0,3).map(([t])=>t);
  const focusTopics=weak.length?weak:topics.slice(0,3).map(([t])=>t);
  set2('dspFocusTitle', weak.length ? `Strengthen ${weak[0]}` : 'Keep sharpening your skills');
  set2('dspFocusText',
    weak.length
      ? `Spend one focused session on ${weak[0]} and solve 2 problems before switching topics.`
      : 'You have completed the sheet. Revisit medium and hard problems to stay interview-ready.'
  );
  if(qs('dspFocusChips')){
    qs('dspFocusChips').innerHTML=focusTopics.map(t=>`<span>${escapeHtml(t)}</span>`).join('');
  }

  // LeetCode-style consistency calendar: the past 365 days, grouped into weeks.
  const activityToday=new Date();
  activityToday.setHours(23,59,59,999);
  const activityStart=new Date(activityToday);
  activityStart.setDate(activityStart.getDate()-364);
  activityStart.setHours(0,0,0,0);
  // Align the first column to Sunday.
  activityStart.setDate(activityStart.getDate()-activityStart.getDay());

  const daily={};
  Object.entries(solvedTimes).forEach(([id,ts])=>{
    if(!solvedSet.has(Number(id))) return;
    const numericTs=typeof ts==='number' ? ts : Number(ts);
    const d=new Date(Number.isFinite(numericTs) ? numericTs : ts);
    if(Number.isNaN(d.getTime())) return;
    const key=d.toISOString().slice(0,10);
    daily[key]=(daily[key]||0)+1;
  });

  const yearStart=new Date(activityToday);
  yearStart.setDate(yearStart.getDate()-364);
  const yearStartKey=yearStart.toISOString().slice(0,10);
  const yearEndKey=activityToday.toISOString().slice(0,10);

  let yearSolves=0;
  let activeDays=0;
  Object.entries(daily).forEach(([key,count])=>{
    if(key>=yearStartKey && key<=yearEndKey){
      yearSolves+=count;
      if(count>0) activeDays++;
    }
  });

  let maxStreak=0, streakRun=0, previousDay=null;
  Object.keys(daily).filter(k=>k>=yearStartKey && k<=yearEndKey).sort().forEach(key=>{
    const d=new Date(key+'T00:00:00');
    if(previousDay){
      const delta=Math.round((d-previousDay)/86400000);
      streakRun=delta===1 ? streakRun+1 : 1;
    }else{
      streakRun=1;
    }
    previousDay=d;
    maxStreak=Math.max(maxStreak,streakRun);
  });

  set2('dspYearSolves',yearSolves);
  set2('dspActiveDays',activeDays);
  set2('dspMaxStreak',maxStreak);

  if(qs('dspHeatmap')){
    const weeks=[];
    const labels=[];
    let weekCursor=new Date(activityStart);
    let lastMonth='';
    for(let w=0;w<53;w++){
      const cells=[];
      const weekStart=new Date(weekCursor);
      const monthKey=`${weekStart.getFullYear()}-${weekStart.getMonth()}`;
      if(monthKey!==lastMonth){
        labels.push(`<span class="dsp-month-label" style="left:${w*15}px">${weekStart.toLocaleDateString(undefined,{month:'short'})}</span>`);
        lastMonth=monthKey;
      }
      for(let dow=0;dow<7;dow++){
        const d=new Date(weekStart);
        d.setDate(weekStart.getDate()+dow);
        const key=d.toISOString().slice(0,10);
        const count=daily[key]||0;
        const level=count>=4?4:count===3?3:count===2?2:count===1?1:0;
        const label=d.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric',year:'numeric'});
        cells.push(`<span class="dsp-heat-cell level-${level}" title="${count} solved · ${label}"></span>`);
      }
      weeks.push(`<div class="dsp-heat-col">${cells.join('')}</div>`);
      weekCursor.setDate(weekCursor.getDate()+7);
    }

    qs('dspHeatmap').innerHTML=`
      <div class="dsp-heat-scroll">
        <div class="dsp-heat-months">${labels.join('')}</div>
        <div class="dsp-heat-main">
          <div class="dsp-heat-daylabels">
            <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
          </div>
          <div class="dsp-heat-grid">${weeks.join('')}</div>
        </div>
        <div class="dsp-heat-legend">
          <span>Less</span>
          <i class="level-0"></i><i class="level-1"></i><i class="level-2"></i><i class="level-3"></i><i class="level-4"></i>
          <span>More</span>
        </div>
      </div>`;
  }

  // Current streak based on days with at least one solve.
  const dayKeys=new Set(Object.keys(daily));
  const isoToday=new Date(); isoToday.setHours(0,0,0,0);
  let cursor=new Date(isoToday);
  let current=0;
  while(dayKeys.has(cursor.toISOString().slice(0,10))){
    current++;
    cursor.setDate(cursor.getDate()-1);
  }
  let best=0,run=0;
  const sortedDays=Object.keys(daily).sort();
  for(let i=0;i<sortedDays.length;i++){
    const prev=i?new Date(sortedDays[i-1]):null;
    const cur=new Date(sortedDays[i]);
    if(prev){
      const delta=Math.round((cur-prev)/(24*60*60*1000));
      if(delta===1) run++; else run=1;
    }else run=1;
    best=Math.max(best,run);
  }
  set2('dspStreakStat',`${current} day${current===1?'':'s'}`);
  set2('dspBestStreak',`Best: ${best} day${best===1?'':'s'}`);

  // Continue button goes to first unsolved problem.
  const next=problems.find(p=>!solvedSet.has(Number(p.id)));
  const btn=qs('dspContinueBtn');
  if(btn){
    btn.textContent=next?`Continue: ${next.name} →`:'Review your sheet →';
    btn.onclick=()=>{
      switchPage('dsa');
      setTimeout(()=>{
        if(next && typeof openProblem==='function') openProblem(next.id);
        else qs('dsaPage')?.scrollIntoView({behavior:'smooth'});
      },60);
    };
  }
}

function bindStaticEvents(){
  const openTaskComposer=()=>{qs('tasksComposer')?.classList.remove('hidden');qs('taskTitle')?.focus();};
  const closeTaskComposer=()=>qs('tasksComposer')?.classList.add('hidden');
  qs('tasksAddTopBtn')?.addEventListener('click',openTaskComposer);
  qs('tasksCloseComposer')?.addEventListener('click',closeTaskComposer);
  qs('taskSearch')?.addEventListener('input',renderTasks);
  qs('taskFilter')?.addEventListener('change',renderTasks);
  qs('taskSubjectFilter')?.addEventListener('change',renderTasks);
  qs('taskDateFilter')?.addEventListener('change',renderTasks);
  if(qs('svAnalyticsBtn')) qs('svAnalyticsBtn').onclick=()=>switchPage('analytics');
  if(qs('globalProfileBtn')) qs('globalProfileBtn').onclick=()=>switchPage('settings');
  if(qs('globalLogoutBtn')) qs('globalLogoutBtn').onclick=()=>{ if(typeof logout==='function') logout(); };
  if(qs('svInsightAction')) qs('svInsightAction').onclick=()=>switchPage('tasks');

  if(qs('svStartFocus')) qs('svStartFocus').onclick=()=>switchPage('focus');
  if(qs('svAddTask')) qs('svAddTask').onclick=()=>switchPage('tasks');
  if(qs('svViewTasks')) qs('svViewTasks').onclick=()=>switchPage('tasks');
  if(qs('svPlannerBtn')) qs('svPlannerBtn').onclick=()=>switchPage('tasks');
  if(qs('svFocusBtn')) qs('svFocusBtn').onclick=()=>switchPage('focus');
  if(qs('svExamBtn')) qs('svExamBtn').onclick=()=>switchPage('exams');
  const sidebarProfileBtn=qs('sidebarProfileBtn');
  if(sidebarProfileBtn) sidebarProfileBtn.onclick=()=>switchPage('settings');
  const profileTopBtn=qs('profileTopBtn');
  if(profileTopBtn) profileTopBtn.onclick=()=>switchPage('settings');
  const sidebarHomeBtn=qs('sidebarHomeBtn');
  if(sidebarHomeBtn) sidebarHomeBtn.onclick=()=>switchPage('dashboard');
  if(qs('globalNotifyBtn')) qs('globalNotifyBtn').onclick=()=>{ const p=qs('ppActivityPopover'); if(p?.classList.contains('hidden')) openActivity(); else closeActivity(); };
  if(qs('ppCloseActivity')) qs('ppCloseActivity').onclick=closeActivity;
  if(qs('ppPaletteOverlay')) qs('ppPaletteOverlay').addEventListener('click',e=>{if(e.target.id==='ppPaletteOverlay')closeCommandPalette();});
  if(qs('ppCommandInput')) qs('ppCommandInput').oninput=e=>renderCommandPalette(e.target.value);
  if(qs('globalCommandBtn')) qs('globalCommandBtn').onclick=openCommandPalette;
  if(qs('mobileNavBtn')) qs('mobileNavBtn').onclick=()=>{
    const open=document.body.classList.toggle('nav-open');
    qs('ppNavOverlay')?.classList.toggle('hidden',!open);
  };
  if(qs('ppNavOverlay')) qs('ppNavOverlay').onclick=closeMobileNav;
  if(qs('ppOpenCoachBtn')) qs('ppOpenCoachBtn').onclick=()=>switchPage('ai');
  if(qs('addInternBtn')) qs('addInternBtn').onclick=addInternship;
  if(!window.__ppHotkeysBound){
    window.__ppHotkeysBound=true;
    document.addEventListener('keydown',e=>{
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openCommandPalette();}
      if(e.key==='Escape'){closeCommandPalette();closeActivity();closeMobileNav();}
      const palette=qs('ppPaletteOverlay');
      if(palette && !palette.classList.contains('hidden') && ['ArrowDown','ArrowUp','Enter'].includes(e.key)){
        const items=[...palette.querySelectorAll('.pp-command-item')];
        if(!items.length) return;
        e.preventDefault();
        const idx=items.findIndex(x=>x.classList.contains('selected'));
        if(e.key==='Enter'){ items[Math.max(0,idx)].click(); return; }
        const next=e.key==='ArrowDown' ? (idx+1)%items.length : (idx<=0?items.length-1:idx-1);
        items.forEach(x=>x.classList.remove('selected'));
        items[next].classList.add('selected');
        items[next].scrollIntoView({block:'nearest'});
      }
    });
  }
  if(window.__pathpilotBound) return;
  window.__pathpilotBound=true;
  document.querySelectorAll('.nav button[data-page]').forEach(btn=>btn.onclick=()=>switchPage(btn.dataset.page));
const doLogout=()=>openConfirmModal('Logout','Are you sure you want to logout from the dashboard?',()=>{ pauseTimer(); clearAuth(); closeConfirmModal(); renderAuth(); });
if(qs('logoutBtn')) qs('logoutBtn').onclick=doLogout;
if(qs('sidebarLogoutBtn')) qs('sidebarLogoutBtn').onclick=doLogout;

  if(qs('addTaskBtn')) qs('addTaskBtn').onclick=()=>{ const title=qs('taskTitle').value.trim(); const desc=qs('taskDesc').value.trim(); const due=qs('taskDue').value; const priority=qs('taskPriority').value; const subject=(qs('taskSubject')?.value||'').trim()||'General'; if(!title) return toast('Enter task title'); state.tasks.unshift({id:uid(),title,desc,due,priority,done:false,subject,completedAt:null}); qs('taskTitle').value=''; qs('taskDesc').value=''; qs('taskDue').value=''; qs('taskPriority').value='medium'; if(qs('taskSubject')) qs('taskSubject').value=''; saveState(); renderAll(); toast('Task added'); };
  if(qs('taskFilter')) qs('taskFilter').onchange=renderTasks; if(qs('taskSearch')) qs('taskSearch').oninput=renderTasks;
  if(qs('addNoteBtn')) qs('addNoteBtn').onclick=()=>{ addNote(qs('noteTitle').value,qs('noteBody').value); qs('noteTitle').value=''; qs('noteBody').value=''; };
  if(qs('quickAddNoteBtn')) qs('quickAddNoteBtn').onclick=()=>{ addNote(qs('quickNoteTitle').value,qs('quickNoteBody').value); qs('quickNoteTitle').value=''; qs('quickNoteBody').value=''; };
  if(qs('noteSearch')) qs('noteSearch').oninput=renderNotes;
  if(qs('prevMonthBtn')) qs('prevMonthBtn').onclick=()=>{ calendarCursor.setMonth(calendarCursor.getMonth()-1); renderCalendar(); };
  if(qs('nextMonthBtn')) qs('nextMonthBtn').onclick=()=>{ calendarCursor.setMonth(calendarCursor.getMonth()+1); renderCalendar(); };
  if(qs('startTimerBtn')) qs('startTimerBtn').onclick=startTimer;
  if(qs('pauseTimerBtn')) qs('pauseTimerBtn').onclick=()=>{ pauseTimer(); toast('Timer paused'); };
  if(qs('resetTimerBtn')) qs('resetTimerBtn').onclick=()=>{ resetTimer(); toast('Timer reset'); };
  document.querySelectorAll('.modeBtn').forEach(btn=>btn.onclick=()=>{ pauseTimer(); document.querySelectorAll('.modeBtn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); state.timerMode=Number(btn.dataset.mode); state.timerSeconds=state.timerMode; state.timerRunning=false; saveState(); renderTimer(); renderStats(); });
  if(qs('soundAlertsToggle')) qs('soundAlertsToggle').onclick=()=>{ state.settings.soundAlerts=!state.settings.soundAlerts; saveState(); renderFocusExtras(); };
  if(qs('browserNotifToggle')) qs('browserNotifToggle').onclick=()=>{ state.settings.browserNotifications=!state.settings.browserNotifications; if(state.settings.browserNotifications && 'Notification' in window && Notification.permission==='default') Notification.requestPermission(); saveState(); renderFocusExtras(); };
  const addGrade=()=>{
    const subject=(qs('gradeSubject')?.value||'').trim();
    const score=Number(qs('gradeScore')?.value);
    const credits=Number(qs('gradeCredits')?.value);

    if(!subject) return toast('Enter a subject','error');
    if(!Number.isFinite(score) || score<0 || score>100) return toast('Score must be between 0 and 100','error');
    if(!Number.isFinite(credits) || credits<=0) return toast('Enter valid credits','error');

    state.grades.unshift({
      id:uid(),
      subject,
      score:Math.round(score),
      credits:Math.round(credits)
    });

    if(qs('gradeSubject')) qs('gradeSubject').value='';
    if(qs('gradeScore')) qs('gradeScore').value='';
    if(qs('gradeCredits')) qs('gradeCredits').value='';

    saveState();
    renderGrades();
    try{ renderAnalytics(); }catch(e){}
    toast('Grade added');
  };
  if(qs('addGradeBtn')) qs('addGradeBtn').onclick=addGrade;
  ['gradeSubject','gradeScore','gradeCredits'].forEach(id=>{
    if(qs(id)) qs(id).onkeydown=e=>{
      if(e.key==='Enter'){ e.preventDefault(); addGrade(); }
    };
  });
  if(qs('addHabitBtn')) qs('addHabitBtn').onclick=()=>{
    const name=qs('habitName').value.trim().replace(/\s+/g,' ');
    const icon=qs('habitIcon').value.trim()||'✅';
    const target=Math.min(7,Math.max(1,Number(qs('habitTarget').value)||1));
    if(!name) return toast('Enter a habit name','error');
    if(name.length<2 || name.length>40) return toast('Habit name should be 2-40 characters','error');
    if(!/[a-zA-Z]/.test(name)) return toast('Habit name must include letters','error');
    state.habits.unshift({id:uid(),name,icon,target,days:[false,false,false,false,false,false,false]});
    qs('habitName').value=''; qs('habitIcon').value=''; qs('habitTarget').value='';
    saveState(); renderAll(); toast('Habit added');
  };
  if(qs('addFlashBtn')) qs('addFlashBtn').onclick=()=>{ const deck=qs('deckName').value.trim(); const question=qs('cardQuestion').value.trim(); const answer=qs('cardAnswer').value.trim(); if(!deck||!question||!answer) return toast('Fill all flashcard fields'); state.flashcards.unshift({id:uid(),deck,question,answer}); state.ui.selectedDeck=deck; state.ui.flashIndex=0; state.ui.flashFlipped=false; qs('deckName').value=''; qs('cardQuestion').value=''; qs('cardAnswer').value=''; saveState(); renderAll(); toast('Flashcard added'); };
  if(qs('flipFlashBtn')) qs('flipFlashBtn').onclick=()=>{ state.ui.flashFlipped=!state.ui.flashFlipped; renderFlashcards(); };
  if(qs('prevFlashBtn')) qs('prevFlashBtn').onclick=()=>{ const cards=state.flashcards.filter(f=>f.deck===state.ui.selectedDeck); if(!cards.length) return; state.ui.flashIndex=(state.ui.flashIndex-1+cards.length)%cards.length; state.ui.flashFlipped=false; renderFlashcards(); };
  if(qs('nextFlashBtn')) qs('nextFlashBtn').onclick=()=>{ const cards=state.flashcards.filter(f=>f.deck===state.ui.selectedDeck); if(!cards.length) return; state.ui.flashIndex=(state.ui.flashIndex+1)%cards.length; state.ui.flashFlipped=false; renderFlashcards(); };
  if(qs('flashCard')) qs('flashCard').onclick=()=>qs('flipFlashBtn').click();
  if(qs('addExamBtn')) qs('addExamBtn').onclick=()=>{ const name=qs('examName').value.trim(); const date=qs('examDate').value; const subject=qs('examSubject').value.trim(); if(!name||!date||!subject) return toast('Fill all exam fields'); state.exams.unshift({id:uid(),name,date,subject}); qs('examName').value=''; qs('examDate').value=''; qs('examSubject').value=''; saveState(); renderAll(); toast('Exam added'); };
  if(qs('addGoalBtn')) qs('addGoalBtn').onclick=()=>{ const title=qs('goalTitle').value.trim(); const target=Number(qs('goalTarget').value)||100; const progress=Number(qs('goalProgressInput').value)||0; if(!title) return toast('Enter goal title'); state.goals.unshift({id:uid(),title,target,progress}); qs('goalTitle').value=''; qs('goalTarget').value=''; qs('goalProgressInput').value=''; saveState(); renderAll(); toast('Goal added'); };
  if(qs('addTtBtn')) qs('addTtBtn').onclick=()=>{ const name=qs('ttName').value.trim(); const day=qs('ttDay').value; const time=qs('ttTime').value.trim(); const color=qs('ttColor').value; if(!name||!time) return toast('Fill timetable fields'); state.timetable.unshift({id:uid(),name,day,time,color}); qs('ttName').value=''; qs('ttTime').value=''; saveState(); renderAll(); toast('Class added'); };
  if(qs('profileSaveBtn')) qs('profileSaveBtn').onclick=()=>{
    const name=qs('profileName')?.value.trim() || 'Student';
    const career=qs('profileCareerGoal')?.value || 'Software Engineering';
    const college=qs('profileCollege')?.value.trim() || '';
    const graduation=qs('profileGraduationYear')?.value || '';
    state.settings.profileName=name;
    state.settings.profileCareerGoal=career;
    state.settings.profileCollege=college;
    state.settings.profileGraduationYear=graduation;
    saveState();
    renderProfile();
    if(qs('profileSaveMessage')) qs('profileSaveMessage').textContent='Profile saved successfully.';
    setTimeout(()=>{ if(qs('profileSaveMessage')) qs('profileSaveMessage').textContent=''; },2200);
    toast('Profile updated');
  };
  if(qs('exportDataBtn')) qs('exportDataBtn').onclick=exportPathPilotData;
  if(qs('importDataBtn')) qs('importDataBtn').onclick=()=>qs('importDataFile')?.click();
  if(qs('importDataFile')) qs('importDataFile').onchange=importPathPilotData;
  if(qs('profileLogoutBtn')) qs('profileLogoutBtn').onclick=()=>{
    openConfirmModal('Logout','Are you sure you want to logout from this browser?',()=>{
      pauseTimer(); clearAuth(); closeConfirmModal(); renderAuth();
    });
  };
}

// Export only learning/productivity data. Never include account credentials or user records.
function exportPathPilotData(){
  try{
    const dsaKeys=['dsa_solved','dsa_solved_times','dsa_notes','dsa_attempts','dsa_revision_dates'];
    const backup={app:'PathPilot',formatVersion:1,exportedAt:new Date().toISOString(),state:clone(state),extras:{}};
    dsaKeys.forEach(key=>{const raw=localStorage.getItem(`pathpilot-${key}`);if(raw!==null){try{backup.extras[key]=JSON.parse(raw)}catch{}}});
    const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');
    a.href=url;a.download=`pathpilot-backup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
    toast('Your PathPilot backup is ready');
  }catch(error){console.error('PathPilot export failed',error);toast('Could not export data. Please try again.','error')}
}

async function importPathPilotData(event){
  const input=event.currentTarget;const file=input.files?.[0];if(!file)return;
  input.value='';
  if(file.size>5*1024*1024)return toast('Backup file is too large (5 MB maximum)','error');
  try{
    const backup=JSON.parse(await file.text());
    if(backup?.app!=='PathPilot'||backup?.formatVersion!==1||!backup.state||typeof backup.state!=='object'||Array.isArray(backup.state)){
      return toast('This is not a supported PathPilot backup','error');
    }
    const requiredArrays=['tasks','notes','timetable','grades','habits','flashcards','exams','goals'];
    if(requiredArrays.some(key=>!Array.isArray(backup.state[key])))return toast('Backup is missing required study data','error');
    if(!Array.isArray(backup.state.internships)) backup.state.internships=[];
    openConfirmModal('Restore backup','This will replace the study data currently saved in this browser. Export your current data first if you need a copy.',()=>{
      try{
        state=mergeState(defaultState,backup.state);saveState();
        const allowed=['dsa_solved','dsa_solved_times','dsa_notes','dsa_attempts','dsa_revision_dates'];
        allowed.forEach(key=>{if(Object.prototype.hasOwnProperty.call(backup.extras||{},key))localStorage.setItem(`pathpilot-${key}`,JSON.stringify(backup.extras[key]));});
        closeConfirmModal();renderAll();if(typeof renderDsaProgress==='function')renderDsaProgress();
        toast('Backup restored successfully');
      }catch(error){console.error('PathPilot restore failed',error);closeConfirmModal();toast('Could not restore this backup','error')}
    });
  }catch(error){console.error('Invalid PathPilot backup',error);toast('Could not read that JSON backup','error')}
}

function renderStats(){
  const total=state.tasks.length;
  const done=state.tasks.filter(t=>t.done).length;
  const notes=state.notes.length;
  const progress=total?Math.round(done/total*100):0;
  const set=(id,val)=>{const el=qs(id);if(el)el.textContent=val};
  set('statTotal',total);
  set('statDone',done);
  set('statNotes',notes);
  set('statProgress',progress+'%');
  const hour=new Date().getHours(); const g=hour<12?'Good morning':hour<17?'Good afternoon':'Good evening'; const n=(state.settings?.profileName||loadAuth()?.name||'Student').split(' ')[0]; set('pageTitle',g+', '+n+'!'); set('pageSubtitle',`Here's your productivity overview for today.`);
  set('dashTaskChip',(total-done)+' pending');
  set('todayPendingCount',total-done);
  set('todayExamCount',state.exams.length);
  set('todayGoalCount',state.goals.filter(g=>g.progress<100).length);
  set('focusStatusPill',state.timerRunning?'Focus timer running':'Focus timer ready');
  set('todayDatePill',new Date().toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'short'}));
  set('navTaskCount',total-done);

  // Progress ring
  const ringFill=qs('dashRingFill');
  if(ringFill){
    const circumference=2*Math.PI*42;
    const offset=circumference-(progress/100)*circumference;
    ringFill.setAttribute('stroke-dasharray',circumference.toFixed(1));
    ringFill.setAttribute('stroke-dashoffset',offset.toFixed(1));
  }
  set('dashRingValue',progress+'%');
}


function renderDashboard(){
  const recent=[...state.tasks].slice(0,4);
  const exams=[...state.exams].sort((a,b)=>daysLeft(a.date)-daysLeft(b.date)).slice(0,3);

  const todayList=qs('todayTaskList');
  if(todayList){
    todayList.innerHTML=recent.length ? recent.map(t=>`
      <div class="sv-task-row ${t.done?'done':''}">
        <span class="sv-task-check">${t.done?'✓':''}</span>
        <div><strong>${escapeHtml(t.title)}</strong><small>${escapeHtml(t.desc||'No description')}</small></div>
        <span class="sv-task-status">${t.done?'Done':'Next'}</span>
      </div>`).join('') :
      '<div class="sv-empty">No tasks yet. Add your first task to get moving.</div>';
  }

  const examList=qs('dashboardExams');
  if(examList){
    examList.innerHTML=exams.length ? exams.map(e=>`
      <div class="sv-exam-row">
        <div><strong>${escapeHtml(e.name)}</strong><small>${escapeHtml(e.subject)}</small></div>
        <span>${daysLeft(e.date)}d</span>
      </div>`).join('') :
      '<div class="sv-empty">No upcoming exams.</div>';
  }

  const hour=new Date().getHours();
  const greeting=hour<12?'Good morning':hour<17?'Good afternoon':'Good evening';
  const name=(state.settings?.profileName||loadAuth()?.name||'Student').split(' ')[0];

  if(qs('sv2Greeting')) qs('sv2Greeting').innerHTML=`${greeting}, ${name}! <span class="sv2-wave" aria-hidden="true">👋</span>`;  if(qs('sv2GreetingSub')) qs('sv2GreetingSub').textContent="Here's your productivity overview for today.";

  const pending=state.tasks.filter(t=>!t.done).length;
  set2('svTasksValue',pending);
  set2('svCheckinValue',state.habits.reduce((sum,h)=>sum+(Array.isArray(h.days)?h.days.filter(Boolean).length:0),0));

  const solved=store.get('dsa_solved',[]);
  set2('svDsaValue',Array.isArray(solved)?solved.length:0);
  set2('svNotesValue',state.notes.length);

  const counts=['S','M','T','W','T','F','S'].map((_,i)=>state.habits.reduce((sum,h)=>sum+(h.days?.[i]?1:0),0));
  const max=Math.max(1,...counts),todayIdx=new Date().getDay();
  if(qs('weekStripTotal')) qs('weekStripTotal').textContent=counts.reduce((a,b)=>a+b,0)+' check-ins';
  if(qs('weekStrip')) qs('weekStrip').innerHTML=counts.map((c,i)=>`
    <div class="sv-week-day ${i===todayIdx?'today':''}">
      <div class="sv-week-track"><span style="height:${Math.max(10,Math.round(c/max*54))}px"></span></div><em>${['S','M','T','W','T','F','S'][i]}</em>
    </div>`).join('');

  const total=state.tasks.length,done=state.tasks.filter(t=>t.done).length,pct=total?Math.round(done/total*100):0;
  set2('svTaskPct',pct+'%');
  set2('svDoneValue',done);
  set2('svExamCount',state.exams.length);
  const bar=qs('svTaskBar'); if(bar) bar.style.width=pct+'%';

  if(typeof renderQuote==='function') renderQuote();
  if(typeof renderInsight==='function') renderInsight();
  if(typeof renderDashboardOverview==='function') renderDashboardOverview();
}

const DASH_QUOTES=[
  {text:'The secret of getting ahead is getting started.',author:'Mark Twain'},
  {text:'Well done is better than well said.',author:'Benjamin Franklin'},
  {text:'It always seems impossible until it is done.',author:'Nelson Mandela'},
  {text:'Success is the sum of small efforts repeated day in and day out.',author:'Robert Collier'},
  {text:'Discipline is choosing between what you want now and what you want most.',author:'Abraham Lincoln'},
  {text:'The expert in anything was once a beginner.',author:'Helen Hayes'},
  {text:'Small daily improvements are the key to staggering long-term results.',author:'James Clear'},
  {text:'You do not have to be great to start, but you have to start to be great.',author:'Zig Ziglar'},
  {text:'Focus on being productive instead of busy.',author:'Tim Ferriss'},
  {text:'A little progress each day adds up to big results.',author:'Satya Nani'}
];
function dayOfYear(d){ const start=new Date(d.getFullYear(),0,0); return Math.floor((d-start)/86400000); }
function renderQuote(){
  if(!Number.isInteger(state.dashboardQuoteIndex)){
    state.dashboardQuoteIndex=Math.floor(Math.random()*DASH_QUOTES.length);
  }
  const q=DASH_QUOTES[state.dashboardQuoteIndex];
  set2('dashQuoteText','"'+q.text+'"');
  set2('dashQuoteAuthor','— '+q.author);
}
function minutesFromSessions(sessions){ return sessions.reduce((sum,s)=>sum+Math.round((s.mode||1500)/60),0); }
function sessionsOn(dateKey){ return state.focusSessions.filter(s=>new Date(s.at).toISOString().slice(0,10)===dateKey); }
function fmtHoursMinutes(totalMinutes){ const h=Math.floor(totalMinutes/60); const m=totalMinutes%60; return `${h}h ${m}m`; }
function renderInsight(){
  const pending=state.tasks.filter(t=>!t.done);
  const el=qs('dashInsightText'); const titleEl=qs('dashInsightTitle');
  if(!el||!titleEl) return;
  if(!state.focusSessions.length){
    titleEl.textContent='Ready to Focus?';
    el.textContent='Start a Pomodoro session to build your streak.';
  } else if(pending.length){
    const top=[...pending].sort((a,b)=>({high:0,medium:1,low:2}[a.priority]-{high:0,medium:1,low:2}[b.priority]))[0];
    titleEl.textContent='Next up';
    el.textContent=`Tackle "${top.title}" — it's marked ${top.priority} priority.`;
  } else {
    titleEl.textContent="You're all caught up!";
    el.textContent='No pending tasks — great time to get ahead or review your notes.';
  }
}
function renderDashboardOverview(){
  const todayKey=new Date().toISOString().slice(0,10);
  const allTasks=state.tasks; const completedTasks=allTasks.filter(t=>t.done);
  const todayTasks=allTasks.filter(t=>t.due===todayKey||!t.due);
  const todayDone=todayTasks.filter(t=>t.done).length;
  set2('ovTasksDone',todayDone); set2('ovTasksTotal',todayTasks.length);
  const solved=store.get('dsa_solved',[]);
  set2('ovDsaSolved',Array.isArray(solved)?Math.min(75,solved.length):0);
  const todaySessions=sessionsOn(todayKey);
  set2('ovPomodoros',todaySessions.filter(s=>s.mode===1500).length);
  const totalAll=state.tasks.length; const doneAll=state.tasks.filter(t=>t.done).length;
  set2('ovProductivity',(totalAll?Math.round(doneAll/totalAll*100):0)+'%');
}
function renderTodayTasksPanel(){
  const todayKey=new Date().toISOString().slice(0,10);
  const list=state.tasks.filter(t=>t.due===todayKey);
  const el=qs('todayTaskList'); if(!el) return;
  el.innerHTML=list.length ? list.map(t=>`<div class="task ${t.done?'done':''}" data-priority="${t.priority}"><input class="check" type="checkbox" ${t.done?'checked':''} onchange="toggleTask('${t.id}')"><div><div class="task-title">${escapeHtml(t.title)}</div><div class="task-meta">Due today • <span class="pill p-${t.priority}">${t.priority}</span></div></div></div>`).join('') : '<div class="empty"><strong>No tasks scheduled for today</strong>Add a task to plan your day.</div>';
}
function renderTodayProgress(){
  const total=state.tasks.length; const done=state.tasks.filter(t=>t.done).length;
  const taskPct=total?Math.round(done/total*100):0;
  set2('tpTaskPct',taskPct+'%'); const tpTaskBar=qs('tpTaskBar'); if(tpTaskBar) tpTaskBar.style.width=taskPct+'%';

  const goalHours=state.settings.studyGoalHours||2;
  const now=new Date(); const weekAgo=new Date(now); weekAgo.setDate(now.getDate()-6); weekAgo.setHours(0,0,0,0);
  const weekSessions=state.focusSessions.filter(s=>s.mode===1500 && new Date(s.at)>=weekAgo);
  const weekMinutes=minutesFromSessions(weekSessions);
  const studyPct=Math.min(100,Math.round((weekMinutes/60)/goalHours*100));
  set2('tpStudyLabel',`Study Goal (${goalHours}h)`); set2('tpStudyPct',studyPct+'%'); const tpStudyBar=qs('tpStudyBar'); if(tpStudyBar) tpStudyBar.style.width=studyPct+'%';

  const goalCount=state.settings.pomodoroGoalCount||4;
  const pomoPct=Math.min(100,Math.round(weekSessions.length/goalCount*100));
  set2('tpPomoLabel',`Pomodoro Goal (${goalCount})`); set2('tpPomoPct',pomoPct+'%'); const tpPomoBar=qs('tpPomoBar'); if(tpPomoBar) tpPomoBar.style.width=pomoPct+'%';

  set2('svWeekTaskValue',`${done}/${state.settings.weeklyTaskGoal||25}`);
  set2('svWeekTaskSub',`${taskPct}% of weekly goal`);
  const svWeekTaskBar=qs('svWeekTaskBar'); if(svWeekTaskBar) svWeekTaskBar.style.width=Math.min(100,taskPct)+'%';

  set2('svWeekStudyValue',`${fmtHoursMinutes(weekMinutes)} / ${goalHours*7}h`);
  set2('svWeekStudySub',`${studyPct}% of weekly goal`);
  const svWeekStudyBar=qs('svWeekStudyBar'); if(svWeekStudyBar) svWeekStudyBar.style.width=studyPct+'%';

  set2('svWeekPomoValue',`${weekSessions.length}/${goalCount*7}`);
  set2('svWeekPomoSub',`${pomoPct}% of weekly goal`);
  const svWeekPomoBar=qs('svWeekPomoBar'); if(svWeekPomoBar) svWeekPomoBar.style.width=pomoPct+'%';
}
function set2(id,val){ const el=qs(id); if(el) el.textContent=val; }
function renderTasks(){
  const filter=qs('taskFilter')?.value||'all';
  const q=(qs('taskSearch')?.value||'').trim().toLowerCase();
  const subject=qs('taskSubjectFilter')?.value||'all';
  const dateFilter=qs('taskDateFilter')?.value||'';
  const subjectEl=qs('taskSubjectFilter');
  if(subjectEl){
    const current=subjectEl.value;
    const subjects=[...new Set(state.tasks.map(t=>t.subject).filter(Boolean))].sort();
    subjectEl.innerHTML='<option value="all">All</option>'+subjects.map(s=>`<option value="${escapeAttr(s)}">${escapeHtml(s)}</option>`).join('');
    subjectEl.value=subjects.includes(current)?current:'all';
  }
  let tasks=[...state.tasks];
  if(filter==='pending') tasks=tasks.filter(t=>!t.done);
  if(filter==='completed') tasks=tasks.filter(t=>t.done);
  if(filter==='high') tasks=tasks.filter(t=>t.priority==='high'&&!t.done);
  if(subject!=='all') tasks=tasks.filter(t=>t.subject===subject);
  if(dateFilter) tasks=tasks.filter(t=>t.due===dateFilter);
  if(q) tasks=tasks.filter(t=>((t.title||'')+' '+(t.desc||'')+' '+(t.subject||'')).toLowerCase().includes(q));

  const makeTask=t=>`<div class="study-task-row ${t.done?'done':''}">
    <input class="check" type="checkbox" ${t.done?'checked':''} onchange="toggleTask('${t.id}')">
    <div class="study-task-main"><div class="study-task-title">${escapeHtml(t.title)}</div><div class="study-task-meta">${escapeHtml(t.desc||'No description')} • Due: ${escapeHtml(formatDate(t.due))} <span class="pill p-${t.priority}">${escapeHtml(t.priority)}</span>${t.subject?`<span class="pill p-blue">${escapeHtml(t.subject)}</span>`:''}</div></div>
    <button class="icon-btn delete" onclick="deleteTask('${t.id}')">Delete</button>
  </div>`;

  const pending=tasks.filter(t=>!t.done), completed=tasks.filter(t=>t.done);
  const p=qs('pendingTaskList'), c=qs('completedTaskList');
  const pendingEmpty='<div class="study-empty">No pending tasks<br><a href="#" onclick="event.preventDefault();document.getElementById(\'tasksAddTopBtn\')?.click();">Add your first task</a></div>';
  const completedEmpty='<div class="study-empty">No completed tasks yet<br><span>Complete a task to see it here!</span></div>';
  if(p) p.innerHTML=pending.length?pending.map(makeTask).join(''):pendingEmpty;
  if(c) c.innerHTML=completed.length?completed.map(makeTask).join(''):completedEmpty;
  set2('pendingCountLabel',`(${pending.length})`);
  set2('completedCountLabel',`(${completed.length})`);
  if(qs('taskList')) qs('taskList').innerHTML=tasks.map(makeTask).join('');
  renderTaskPlannerExtras();
}
function renderTaskPlannerExtras(){
  const total=state.tasks.length;
  const pending=state.tasks.filter(t=>!t.done).length;
  const done=state.tasks.filter(t=>t.done).length;
  const high=state.tasks.filter(t=>t.priority==='high' && !t.done).length;
  set2('taskStatTotal',total);
  set2('taskStatPending',pending);
  set2('taskStatDone',done);
  set2('taskStatHigh',high);
  set2('tasksHeroChip',pending+' pending');
  set2('tasksHeroSub',pending ? `You have ${pending} task${pending>1?'s':''} left to complete${high?`, including ${high} high priority`:''}.` : 'Nothing pending — nice work. Add a task to keep planning ahead.');

  // Week-mini due-date strip (Mon-Sun of current week)
  const now=new Date(); now.setHours(0,0,0,0);
  const dow=(now.getDay()+6)%7; // Mon=0 ... Sun=6
  const monday=new Date(now); monday.setDate(now.getDate()-dow);
  const dayNames=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  let weekTotal=0;
  const cols=dayNames.map((label,i)=>{
    const d=new Date(monday); d.setDate(monday.getDate()+i);
    const key=d.toISOString().slice(0,10);
    const count=state.tasks.filter(t=>t.due===key).length;
    weekTotal+=count;
    const isToday=key===now.toISOString().slice(0,10);
    return `<div class="wmcol ${isToday?'today':''} ${count?'has-tasks':''}"><div class="wm-day">${label}</div><div class="wm-date">${d.getDate()}</div><div class="wm-count">${count?count+' task'+(count>1?'s':''):'—'}</div></div>`;
  }).join('');
  const stripEl=qs('weekMiniStrip'); if(stripEl) stripEl.innerHTML=cols;
  set2('weekMiniTotal',weekTotal+' due this week');
}
window.toggleTask=id=>{ const t=state.tasks.find(x=>x.id===id); if(!t) return; t.done=!t.done; t.completedAt=t.done?Date.now():null; saveState(); renderAll(); toast(t.done?'Task completed':'Task marked pending'); };
window.deleteTask=id=>{ state.tasks=state.tasks.filter(t=>t.id!==id); saveState(); renderAll(); toast('Task deleted'); };
function addNote(title,body){ if(!title.trim()) return toast('Enter note title','error'); state.notes.unshift({id:uid(),title:title.trim(),body:body.trim(),createdAt:Date.now(),pinned:false}); saveState(); renderAll(); toast('Note saved'); }
const NOTE_ACCENTS=['#3b82f6','#7c3aed','#f59e0b','#10b981','#ef4444','#0ea5e9'];
function renderNotes(){
  const q=qs('noteSearch').value.trim().toLowerCase();
  const notes=state.notes.filter(n=>!q || n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q));
  const sorted=[...notes].sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0));
  qs('noteList').innerHTML=!sorted.length ? '<div class="empty"><strong>No notes found</strong>Create a note or change your search.</div>' : sorted.map((n,i)=>{
    const accent=NOTE_ACCENTS[i%NOTE_ACCENTS.length];
    return `<div class="note" style="--note-accent:${accent}">
      <div class="note-card-top">
        <div style="min-width:0;">
          <h3>${n.pinned?'📌 ':''}${escapeHtml(n.title)}</h3>
          <p class="note-body-preview">${escapeHtml(n.body)}</p>
          <div class="muted" style="margin-top:8px;font-size:12px;">${n.updatedAt?'Edited '+new Date(n.updatedAt).toLocaleString():new Date(n.createdAt).toLocaleString()}</div>
        </div>
        <div class="item-actions" style="display:flex;gap:6px;flex-shrink:0;align-items:flex-start;">
          <button class="note-pin-btn ${n.pinned?'pinned':''}" onclick="toggleNotePin('${n.id}')" aria-label="${n.pinned?'Unpin note':'Pin note'}" title="${n.pinned?'Unpin':'Pin to top'}">${n.pinned?'📌':'📍'}</button>
          <button class="icon-btn" onclick="openNoteEditModal('${n.id}')" aria-label="Edit note">Edit</button>
          <button class="icon-btn delete" onclick="deleteNote('${n.id}')">Delete</button>
        </div>
      </div>
    </div>`;
  }).join('');
  renderNotesStatStrip();
}
function renderNotesStatStrip(){
  const el=qs('notesStatStrip'); if(!el) return;
  const total=state.notes.length;
  const pinned=state.notes.filter(n=>n.pinned).length;
  const weekAgo=Date.now()-7*24*60*60*1000;
  const thisWeek=state.notes.filter(n=>n.createdAt>=weekAgo).length;
  el.innerHTML=`
    <div class="stat-strip-item"><div class="stat-strip-icon" style="background:#eef2ff;">📝</div><div><div class="stat-strip-value">${total}</div><div class="stat-strip-label">Total notes</div></div></div>
    <div class="stat-strip-item"><div class="stat-strip-icon" style="background:#fef3c7;">📌</div><div><div class="stat-strip-value">${pinned}</div><div class="stat-strip-label">Pinned</div></div></div>
    <div class="stat-strip-item"><div class="stat-strip-icon" style="background:#dcfce7;">🗓️</div><div><div class="stat-strip-value">${thisWeek}</div><div class="stat-strip-label">Added this week</div></div></div>`;
}
window.toggleNotePin=id=>{ const n=state.notes.find(x=>x.id===id); if(!n) return; n.pinned=!n.pinned; saveState(); renderNotes(); toast(n.pinned?'Note pinned':'Note unpinned'); };
window.deleteNote=id=>{ const n=state.notes.find(x=>x.id===id); if(!n) return; if(!confirm(`Delete note "${n.title}"? This can't be undone.`)) return; state.notes=state.notes.filter(x=>x.id!==id); saveState(); renderAll(); toast('Note deleted'); };
function openNoteEditModal(id){
  const note=state.notes.find(n=>n.id===id);
  if(!note) return;
  const existing=document.getElementById('noteEditModal');
  if(existing) existing.remove();
  const modal=document.createElement('div');
  modal.id='noteEditModal';
  modal.className='note-modal-overlay';
  modal.innerHTML=`
    <div class="note-modal">
      <div class="note-modal-header">
        <h3>Edit Note</h3>
        <button class="note-modal-close" aria-label="Close">&times;</button>
      </div>
      <input class="input" id="noteEditTitle" style="margin:0 24px 10px;width:calc(100% - 48px);" placeholder="Title" value="${escapeHtml(note.title)}" />
      <textarea class="note-modal-textarea" id="noteEditBody" placeholder="Write your note...">${escapeHtml(note.body)}</textarea>
      <div class="note-modal-actions">
        <button class="btn btn-secondary btn-small note-modal-cancel">Cancel</button>
        <button class="btn btn-primary btn-small note-modal-save">Save</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  const close=()=>modal.remove();
  modal.addEventListener('click',e=>{ if(e.target===modal) close(); });
  modal.querySelector('.note-modal-close').addEventListener('click',close);
  modal.querySelector('.note-modal-cancel').addEventListener('click',close);
  modal.querySelector('.note-modal-save').addEventListener('click',()=>{
    const title=qs('noteEditTitle').value.trim();
    const body=qs('noteEditBody').value.trim();
    if(!title) return toast('Enter note title','error');
    note.title=title; note.body=body; note.updatedAt=Date.now();
    saveState(); renderNotes(); toast('Note updated'); close();
  });
  const titleInput=qs('noteEditTitle'); if(titleInput) titleInput.focus();
}
window.openNoteEditModal=openNoteEditModal;
function renderCalendar(){ state.calendarDate=calendarCursor.toISOString(); saveState(); qs('monthLabel').textContent=calendarCursor.toLocaleDateString(undefined,{month:'long',year:'numeric'}); const names=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']; const first=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth(),1); const last=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth()+1,0); const startDay=first.getDay(); const totalCells=Math.ceil((startDay+last.getDate())/7)*7; let html=names.map(n=>`<div class="dayhead">${n}</div>`).join(''); for(let i=0;i<totalCells;i++){ const dayNum=i-startDay+1; if(dayNum<1||dayNum>last.getDate()){ html+='<div class="day"></div>'; continue; } const d=new Date(calendarCursor.getFullYear(),calendarCursor.getMonth(),dayNum); const key=d.toISOString().slice(0,10); const count=state.tasks.filter(t=>t.due===key).length+state.exams.filter(e=>e.date===key).length; const isToday=key===new Date().toISOString().slice(0,10); html+=`<div class="day ${isToday?'today':''}">${dayNum}${count?`<span class="count">${count} item${count>1?'s':''}</span>`:''}</div>`; } qs('calendarGrid').innerHTML=html; }
function renderTimer(){
  const m=String(Math.floor(state.timerSeconds/60)).padStart(2,'0'); const s=String(state.timerSeconds%60).padStart(2,'0');
  qs('timerDisplay').textContent=`${m}:${s}`;
  document.querySelectorAll('.modeBtn').forEach(btn=>btn.classList.toggle('active',Number(btn.dataset.mode)===state.timerMode));
  const label=state.timerMode===1500?'Focus':state.timerMode===300?'Short Break':'Long Break';
  set2('ringTimerLabel',label);  set2('pomoCompletedLabel',`${sessionsOn(new Date().toISOString().slice(0,10)).filter(s=>s.mode===1500).length} pomodoros completed`);
  const ring=qs('focusRingFill');
  if(ring){
    const circumference=2*Math.PI*44;
    const elapsedFraction=state.timerMode ? 1-(state.timerSeconds/state.timerMode) : 0;
    ring.setAttribute('stroke-dasharray',circumference.toFixed(1));
    ring.setAttribute('stroke-dashoffset',(circumference*(1-elapsedFraction)).toFixed(1));
  }
}
function renderFocusExtras(){
  const todayKey=new Date().toISOString().slice(0,10);
  const focusOnly=s=>s.mode===1500;
  const breakOnly=s=>s.mode===300||s.mode===900;
  const today=state.focusSessions.filter(s=>focusOnly(s) && new Date(s.at).toISOString().slice(0,10)===todayKey);
  const todayBreaks=state.focusSessions.filter(s=>breakOnly(s) && new Date(s.at).toISOString().slice(0,10)===todayKey);
  set2('focusSessionsToday',today.length);
  set2('focusMinutesToday',today.length*25);
  set2('focusTimeToday',fmtHoursMinutes(minutesFromSessions(today)));
  set2('breakTimeToday',minutesFromSessions(todayBreaks)+'m');
  set2('tasksPendingCount',state.tasks.filter(t=>!t.done).length);
  set2('focusTodayChip',today.length+' session'+(today.length===1?'':'s')+' today');
  const now=new Date();
  const weekAgo=new Date(now); weekAgo.setDate(now.getDate()-6); weekAgo.setHours(0,0,0,0);
  const thisWeek=state.focusSessions.filter(s=>focusOnly(s) && new Date(s.at)>=weekAgo);
  set2('focusSessionsWeek',thisWeek.length);
  // Simple day streak: consecutive days (including today) with at least one focus session
  let streak=0;
  for(let i=0;i<365;i++){
    const d=new Date(now); d.setDate(now.getDate()-i); d.setHours(0,0,0,0);
    const key=d.toISOString().slice(0,10);
    const hasSession=state.focusSessions.some(s=>focusOnly(s) && new Date(s.at).toISOString().slice(0,10)===key);
    if(hasSession) streak++; else break;
  }
  set2('focusStreak',streak);
  set2('focusHeroSub',today.length ? `Nice work — ${today.length} session${today.length>1?'s':''} logged today. Keep the momentum going.` : 'Work in focused sprints, then rest — 25 minutes on, 5 minutes off.');
  renderFocusPattern();
  renderFocusTaskSuggestions();

  // Timer settings toggle switches reflect saved state
  const soundToggle=qs('soundAlertsToggle'); if(soundToggle) soundToggle.classList.toggle('on',!!state.settings.soundAlerts);
  const notifToggle=qs('browserNotifToggle'); if(notifToggle) notifToggle.classList.toggle('on',!!state.settings.browserNotifications);
}
function renderFocusPattern(){
  const el=qs('focusPatternText'); if(!el) return;
  const focusSessions=state.focusSessions.filter(s=>s.mode===1500);
  if(!focusSessions.length){
    el.innerHTML='<strong>Start Your First Session</strong>Complete a Pomodoro to see personalized insights.';
    return;
  }
  const hourCounts=new Array(24).fill(0);
  focusSessions.forEach(s=>hourCounts[new Date(s.at).getHours()]++);
  const bestHour=hourCounts.indexOf(Math.max(...hourCounts));
  const label=bestHour===0?'12 AM':bestHour<12?`${bestHour} AM`:bestHour===12?'12 PM':`${bestHour-12} PM`;
  el.innerHTML=`<strong>You focus best around ${label}</strong>${focusSessions.length} session${focusSessions.length===1?'':'s'} logged so far — most of them start around this time.`;
}
function renderFocusTaskSuggestions(){
  const el=qs('focusTaskSuggestions'); if(!el) return;
  const order={high:0,medium:1,low:2};
  const pending=[...state.tasks].filter(t=>!t.done).sort((a,b)=>order[a.priority]-order[b.priority]).slice(0,3);
  el.innerHTML=pending.length ? pending.map(t=>`<div class="note"><div><h3>${escapeHtml(t.title)}</h3><p><span class="pill p-${t.priority}">${t.priority}</span> ${t.subject?escapeHtml(t.subject):''}</p></div></div>`).join('') : '<div class="empty"><strong>No pending tasks for today. Great job!</strong></div>';
}
function playAlertSound(){ try{ const ctx=new (window.AudioContext||window.webkitAudioContext)(); const osc=ctx.createOscillator(); const gain=ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.frequency.value=880; gain.gain.setValueAtTime(0.15,ctx.currentTime); osc.start(); osc.stop(ctx.currentTime+0.3); }catch(e){} }
function startTimer(){ if(timerInterval) return; state.timerRunning=true; saveState(); renderStats(); timerInterval=setInterval(()=>{ if(state.timerSeconds>0){ state.timerSeconds--; renderTimer(); saveState(); } else { clearInterval(timerInterval); timerInterval=null; state.timerRunning=false; state.focusSessions.unshift({id:uid(),at:Date.now(),mode:state.timerMode}); state.timerSeconds=state.timerMode; saveState(); renderTimer(); renderFocusLog(); renderFocusExtras(); renderStats(); toast('Focus session complete'); if(state.settings.soundAlerts) playAlertSound(); if(state.settings.browserNotifications && 'Notification' in window && Notification.permission==='granted') new Notification('PathPilot',{body:'Session complete — nice work!'}); } },1000); }
function pauseTimer(){ clearInterval(timerInterval); timerInterval=null; state.timerRunning=false; saveState(); renderStats(); }
function resetTimer(){ pauseTimer(); state.timerSeconds=state.timerMode; saveState(); renderTimer(); }
function renderFocusLog(){ qs('focusLog').innerHTML=state.focusSessions.length ? state.focusSessions.slice(0,8).map(s=>`<div class="note"><div><h3>${s.mode===1500?'Focus':s.mode===300?'Short Break':'Long Break'}</h3><p>${new Date(s.at).toLocaleString()}</p></div></div>`).join('') : '<div class="empty"><strong>No sessions completed</strong>Your completed focus sessions will appear here.</div>'; }
function letterGrade(score){
  if(score>=90) return {letter:'A',color:'#10b981'};
  if(score>=80) return {letter:'B',color:'#3b82f6'};
  if(score>=70) return {letter:'C',color:'#f59e0b'};
  if(score>=60) return {letter:'D',color:'#f97316'};
  return {letter:'F',color:'#ef4444'};
}
function renderGrades(){
  const list=qs('gradeList');
  const gpaBox=qs('gpaBox');
  const grades=Array.isArray(state.grades)?state.grades:[];

  if(list){
    list.innerHTML=grades.length
      ? grades.map(g=>{
          const score=Number(g.score);
          const lg=letterGrade(score);
          return `
          <div class="grade">
            <div class="grade-badge" style="background:${lg.color}">${lg.letter}</div>
            <div>
              <div class="item-title">${escapeHtml(g.subject)}</div>
              <div class="item-meta">Score: ${score.toFixed(0)} • Credits: ${Number(g.credits).toFixed(0)}</div>
              <div class="grade-bar-track"><span class="grade-bar-fill" style="width:${score}%;background:${lg.color}"></span></div>
            </div>
            <div class="item-actions">
              <button class="icon-btn" onclick="openGradeEditModal('${g.id}')">Edit</button>
              <button class="icon-btn delete" onclick="deleteGrade('${g.id}')">Delete</button>
            </div>
          </div>`;
        }).join('')
      : '<div class="empty"><strong>No grades added</strong><span>Add subject scores to see your academic summary.</span></div>';
  }

  const totalCredits=grades.reduce((sum,g)=>sum+Number(g.credits||0),0);
  const weightedScore=grades.reduce((sum,g)=>sum+(Number(g.score||0)*Number(g.credits||0)),0);
  const average=totalCredits ? weightedScore/totalCredits : 0;
  const gpa=Math.min(10,average/10);
  if(gpaBox) gpaBox.textContent=gpa.toFixed(2);
  const gpaRing=qs('gpaRing'); if(gpaRing) gpaRing.style.setProperty('--gpa-pct',Math.round(gpa/10*100)+'%');

  const gradeCount=qs('gradeCount');
  if(gradeCount) gradeCount.textContent=`${grades.length} grade${grades.length===1?'':'s'}`;

  renderGradesStatStrip(grades,average);
}
function renderGradesStatStrip(grades,average){
  const el=qs('gradesStatStrip'); if(!el) return;
  const highest=grades.length ? Math.max(...grades.map(g=>Number(g.score))) : 0;
  const topSubject=grades.length ? grades.reduce((a,b)=>Number(b.score)>Number(a.score)?b:a).subject : '—';
  el.innerHTML=`
    <div class="stat-strip-item"><div class="stat-strip-icon" style="background:#eef2ff;">📚</div><div><div class="stat-strip-value">${grades.length}</div><div class="stat-strip-label">Subjects tracked</div></div></div>
    <div class="stat-strip-item"><div class="stat-strip-icon" style="background:#dcfce7;">📈</div><div><div class="stat-strip-value">${average?average.toFixed(1):'—'}</div><div class="stat-strip-label">Average score</div></div></div>
    <div class="stat-strip-item"><div class="stat-strip-icon" style="background:#fef3c7;">🏆</div><div><div class="stat-strip-value">${highest?highest.toFixed(0):'—'}</div><div class="stat-strip-label">Top: ${escapeHtml(topSubject)}</div></div></div>`;
}

window.deleteGrade=id=>{
  const g=state.grades.find(x=>x.id===id);
  if(!g) return toast('Grade not found','error');
  if(!confirm(`Delete grade for "${g.subject}"?`)) return;
  state.grades=state.grades.filter(x=>x.id!==id);
  saveState();
  renderAll();
  toast('Grade deleted');
};
function openGradeEditModal(id){
  const g=state.grades.find(x=>x.id===id);
  if(!g) return;
  const existing=document.getElementById('gradeEditModal');
  if(existing) existing.remove();
  const modal=document.createElement('div');
  modal.id='gradeEditModal';
  modal.className='note-modal-overlay';
  modal.innerHTML=`
    <div class="note-modal">
      <div class="note-modal-header">
        <h3>Edit Grade</h3>
        <button class="note-modal-close" aria-label="Close">&times;</button>
      </div>
      <div style="margin:0 24px 10px;display:grid;gap:10px;">
        <input class="input" id="gradeEditSubject" placeholder="Subject" value="${escapeHtml(g.subject)}" />
        <input class="input" id="gradeEditScore" type="number" min="0" max="100" placeholder="Score (0-100)" value="${Number(g.score)}" />
        <input class="input" id="gradeEditCredits" type="number" min="1" max="10" placeholder="Credits (1-10)" value="${Number(g.credits)}" />
      </div>
      <div class="note-modal-actions">
        <button class="btn btn-secondary btn-small note-modal-cancel">Cancel</button>
        <button class="btn btn-primary btn-small note-modal-save">Save</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  const close=()=>modal.remove();
  modal.addEventListener('click',e=>{ if(e.target===modal) close(); });
  modal.querySelector('.note-modal-close').addEventListener('click',close);
  modal.querySelector('.note-modal-cancel').addEventListener('click',close);
  modal.querySelector('.note-modal-save').addEventListener('click',()=>{
    const subject=qs('gradeEditSubject').value.trim();
    const score=Number(qs('gradeEditScore').value);
    const credits=Number(qs('gradeEditCredits').value);
    if(!subject) return toast('Enter a subject','error');
    if(!Number.isFinite(score)||score<0||score>100) return toast('Score must be between 0 and 100','error');
    if(!Number.isFinite(credits)||credits<=0) return toast('Enter valid credits','error');
    g.subject=subject; g.score=Math.round(score); g.credits=Math.round(credits);
    saveState(); renderGrades(); try{ renderAnalytics(); }catch(e){} toast('Grade updated'); close();
  });
  const subjInput=qs('gradeEditSubject'); if(subjInput) subjInput.focus();
}
window.openGradeEditModal=openGradeEditModal;
function habitStreak(days){
  // days array indexed Sun(0)..Sat(6); count consecutive completed days ending today, wrapping into last week
  const todayIdx=new Date().getDay();
  let streak=0;
  for(let step=0;step<7;step++){
    const idx=(todayIdx-step+7)%7;
    if(days[idx]) streak++; else break;
  }
  return streak;
}
function renderHabits(){
  const todayIdx=new Date().getDay();
  qs('habitList').innerHTML=state.habits.length ? state.habits.map(h=>{
    const completed=h.days.filter(Boolean).length;
    const metTarget=completed>=h.target;
    const pct=Math.min(100,Math.round(completed/h.target*100));
    const streak=habitStreak(h.days);
    return `<div class="habit">
      <div class="habit-icon-badge">${escapeHtml(h.icon||'✅')}</div>
      <div>
        <div class="item-title">${escapeHtml(h.name)}${streak>=2?`<span class="habit-streak">🔥 ${streak}-day streak</span>`:''}</div>
        <div class="item-meta"><span class="habit-progress ${metTarget?'met':''}">${completed}/${h.target} this week${metTarget?' 🎉':''}</span></div>
        <div class="habit-bar-track"><span class="habit-bar-fill" style="width:${pct}%"></span></div>
        <div class="week">${['S','M','T','W','T','F','S'].map((d,i)=>`<div class="wd ${h.days[i]?'done':''} ${i===todayIdx?'today':''}" onclick="toggleHabitDay('${h.id}',${i})" title="${i===todayIdx?'Today':d}">${d}</div>`).join('')}</div>
      </div>
      <div class="item-actions"><button class="icon-btn delete" onclick="deleteHabit('${h.id}')">Delete</button></div>
    </div>`;
  }).join('') : '<div class="empty"><strong>No habits added</strong>Create a habit to begin tracking consistency.</div>';
  renderHabitsStatStrip();
}
function renderHabitsStatStrip(){
  const el=qs('habitsStatStrip'); if(!el) return;
  const active=state.habits.length;
  const totalCheckins=state.habits.reduce((sum,h)=>sum+h.days.filter(Boolean).length,0);
  const best=state.habits.length ? state.habits.reduce((a,b)=>habitStreak(b.days)>habitStreak(a.days)?b:a) : null;
  const bestStreak=best ? habitStreak(best.days) : 0;
  el.innerHTML=`
    <div class="stat-strip-item"><div class="stat-strip-icon" style="background:#eef2ff;">✅</div><div><div class="stat-strip-value">${active}</div><div class="stat-strip-label">Active habits</div></div></div>
    <div class="stat-strip-item"><div class="stat-strip-icon" style="background:#dcfce7;">🗓️</div><div><div class="stat-strip-value">${totalCheckins}</div><div class="stat-strip-label">Check-ins this week</div></div></div>
    <div class="stat-strip-item"><div class="stat-strip-icon" style="background:#fef3c7;">🔥</div><div><div class="stat-strip-value">${bestStreak}</div><div class="stat-strip-label">${best?'Best streak: '+escapeHtml(best.name):'Best streak'}</div></div></div>`;
}
window.toggleHabitDay=(id,i)=>{ const h=state.habits.find(x=>x.id===id); if(!h) return; h.days[i]=!h.days[i]; saveState(); renderAll(); };
window.deleteHabit=id=>{ const h=state.habits.find(x=>x.id===id); if(!h) return; if(!confirm(`Delete habit "${h.name}"? Its history will be lost.`)) return; state.habits=state.habits.filter(x=>x.id!==id); saveState(); renderAll(); toast('Habit deleted'); };
function renderFlashcards(){
  const decks=[...new Set(state.flashcards.map(f=>f.deck))];
  qs('deckFolders').innerHTML=decks.map(d=>`<div class="folder ${state.ui.selectedDeck===d?'active':''}" data-deck="${escapeHtml(d)}" onclick="selectDeck(this.dataset.deck)">${escapeHtml(d)}</div>`).join('');
  const cards=state.flashcards.filter(f=>f.deck===state.ui.selectedDeck);
  qs('flashCount').textContent=cards.length+' cards';
  const sm2=qs('sm2RatingRow');
  if(!cards.length){
    qs('flashCard').textContent='No cards in this deck';
    qs('flashList').innerHTML='<div class="empty"><strong>No flashcards found</strong>Create cards to begin studying this deck.</div>';
    if(sm2) sm2.classList.add('hidden');
    return;
  }
  if(state.ui.flashIndex>=cards.length) state.ui.flashIndex=0;
  const c=cards[state.ui.flashIndex];
  qs('flashCard').textContent=state.ui.flashFlipped ? c.answer : c.question;
  if(sm2){
    if(state.ui.flashFlipped) sm2.classList.remove('hidden');
    else sm2.classList.add('hidden');
  }
  qs('flashList').innerHTML=cards.map(c=>`<div class="flash"><div><div class="item-title">${escapeHtml(c.question)}</div><div class="item-meta">${escapeHtml(c.answer)}</div></div><div><span class="pill p-purple">${escapeHtml(c.deck)}</span></div><div class="item-actions"><button class="icon-btn delete" onclick="deleteFlash('${c.id}')">Delete</button></div></div>`).join('');
}
window.selectDeck=deck=>{ state.ui.selectedDeck=deck; state.ui.flashIndex=0; state.ui.flashFlipped=false; saveState(); renderFlashcards(); };
window.deleteFlash=id=>{ state.flashcards=state.flashcards.filter(f=>f.id!==id); const decks=[...new Set(state.flashcards.map(f=>f.deck))]; if(!decks.includes(state.ui.selectedDeck)) state.ui.selectedDeck=decks[0] || ''; state.ui.flashIndex=0; state.ui.flashFlipped=false; saveState(); renderAll(); toast('Flashcard deleted'); };
function renderExams(){ const exams=[...state.exams].sort((a,b)=>daysLeft(a.date)-daysLeft(b.date)); qs('examList').innerHTML=exams.length ? exams.map(e=>`<div class="exam"><div><div class="item-title">${escapeHtml(e.name)}</div><div class="item-meta">${escapeHtml(e.subject)} • ${formatDate(e.date)}</div></div><div class="countdown">${daysLeft(e.date)} <span>days left</span></div></div><div class="item-actions"><button class="icon-btn delete" onclick="deleteExam('${e.id}')">Delete</button></div></div>`).join('') : '<div class="empty"><strong>No exams added</strong>Add an exam to see countdown details.</div>'; }
window.deleteExam=id=>{ state.exams=state.exams.filter(e=>e.id!==id); saveState(); renderAll(); toast('Exam deleted'); };
function renderGoals(){ qs('goalList').innerHTML=state.goals.length ? state.goals.map(g=>`<div class="goal"><div><div class="item-title">${escapeHtml(g.title)}</div><div class="item-meta">Target ${g.target}% • Current ${g.progress}%</div><div class="bar" style="margin-top:10px"><span style="width:${Math.min(100,g.progress)}%"></span></div></div><div><span class="pill p-blue">${g.progress}%</span></div><div class="item-actions"><button class="icon-btn" onclick="bumpGoal('${g.id}',10)">+10</button><button class="icon-btn delete" onclick="deleteGoal('${g.id}')">Delete</button></div></div>`).join('') : '<div class="empty"><strong>No goals added</strong>Create a goal to track your target progress.</div>'; }

function internList(){ return Array.isArray(state.internships) ? state.internships : (state.internships=[]); }
function nextDsaProblem(){
  const solvedRaw=store.get('dsa_solved',[]);
  const solved=new Set((Array.isArray(solvedRaw)?solvedRaw:[]).map(Number));
  return (typeof PROBLEMS!=='undefined'?PROBLEMS:[]).find(p=>!solved.has(Number(p.id))) || null;
}
function addInternship(){
  const company=(qs('internCompany')?.value||'').trim();
  const role=(qs('internRole')?.value||'').trim();
  const status=qs('internStatus')?.value||'applied';
  const date=qs('internDate')?.value||new Date().toISOString().slice(0,10);
  const link=(qs('internLink')?.value||'').trim();
  const notes=(qs('internNotes')?.value||'').trim();
  if(!company||!role) return toast('Enter company and role','error');
  internList().unshift({id:uid(),company,role,status,date,link,notes});
  ['internCompany','internRole','internLink','internNotes'].forEach(id=>{ if(qs(id)) qs(id).value=''; });
  saveState(); renderInternships(); renderDailyBriefing(); toast('Opportunity added');
}
window.changeInternStatus=function(id,status){
  const item=internList().find(x=>x.id===id); if(!item) return;
  item.status=status; saveState(); renderInternships(); renderDailyBriefing(); toast('Status updated');
};
window.deleteInternship=function(id){
  openConfirmModal('Remove opportunity','Remove this internship from your pipeline?',()=>{
    state.internships=internList().filter(x=>x.id!==id); saveState(); closeConfirmModal(); renderInternships(); renderDailyBriefing(); toast('Removed');
  });
};
function renderInternships(){
  const items=internList();
  const counts=Object.keys(INTERN_STATUSES).reduce((acc,k)=>{acc[k]=items.filter(x=>x.status===k).length;return acc;}, {});
  const active=items.filter(x=>!['offer','rejected'].includes(x.status)).length;
  set2('internHeroChip',`${active} active`);
  set2('navInternCount',String(items.length));
  const stats=qs('internStatGrid');
  if(stats){
    stats.innerHTML=[
      ['In pipeline',active,'open roles'],
      ['Applied',counts.applied||0,'submitted'],
      ['Interviews',(counts.interview||0)+(counts.oa||0),'OA + interview'],
      ['Offers',counts.offer||0,'won']
    ].map(([label,val,sub])=>`<div class="intern-stat-card"><span>${label}</span><strong>${val}</strong><small class="muted">${sub}</small></div>`).join('');
  }
  const groups=[['wishlist','applied'],['oa','interview'],['offer','rejected']];
  const board=qs('internBoard');
  if(!board) return;
  board.innerHTML=groups.map(keys=>{
    const rows=items.filter(x=>keys.includes(x.status));
    const title=keys.map(k=>INTERN_STATUSES[k]).join(' / ');
    return `<section class="intern-col"><h3>${title}<em>${rows.length}</em></h3>${rows.length?rows.map(x=>`
      <article class="intern-card">
        <span class="intern-status st-${x.status}">${INTERN_STATUSES[x.status]||x.status}</span>
        <strong>${escapeHtml(x.company)}</strong>
        <small>${escapeHtml(x.role)} · ${formatDate(x.date)}${x.notes?' · '+escapeHtml(x.notes):''}</small>
        <div class="intern-actions">
          <select onchange="changeInternStatus('${x.id}',this.value)">${Object.entries(INTERN_STATUSES).map(([k,v])=>`<option value="${k}" ${x.status===k?'selected':''}>${v}</option>`).join('')}</select>
          ${x.link?`<a class="btn ghost small" href="${escapeAttr(x.link)}" target="_blank" rel="noopener">Open</a>`:''}
          <button class="icon-btn delete" type="button" onclick="deleteInternship('${x.id}')">Delete</button>
        </div>
      </article>`).join(''):'<div class="empty"><strong>Empty</strong>Move a company here as it progresses.</div>'}</section>`;
  }).join('');
}
function renderDailyBriefing(){
  const grid=qs('ppBriefingGrid'); if(!grid) return;
  const pending=state.tasks.filter(t=>!t.done)[0];
  const exam=[...state.exams].sort((a,b)=>daysLeft(a.date)-daysLeft(b.date))[0];
  const intern=internList().find(x=>['oa','interview','applied'].includes(x.status))||internList()[0];
  const next=nextDsaProblem();
  const cards=[
    {go:'tasks',kicker:'TASK',title:pending?pending.title:'All tasks clear',sub:pending?(pending.subject||'Study planner'):'Add a new study goal'},
    {go:'dsa',kicker:'DSA',title:next?next.name:'Sheet complete',sub:next?`${next.topic} · ${next.difficulty}`:'Keep revising weak topics'},
    {go:'exams',kicker:'EXAM',title:exam?exam.name:'No exams logged',sub:exam?`${exam.subject} · ${daysLeft(exam.date)} days`:'Add your next paper'},
    {go:'internships',kicker:'CAREER',title:intern?`${intern.company}`:'Start your pipeline',sub:intern?`${INTERN_STATUSES[intern.status]||intern.status} · ${intern.role}`:'Track internships and offers'}
  ];
  grid.innerHTML=cards.map(c=>`<button class="pp-brief-item" type="button" data-go="${c.go}"><span>${c.kicker}</span><strong>${escapeHtml(c.title)}</strong><small>${escapeHtml(c.sub)}</small></button>`).join('');
  grid.querySelectorAll('[data-go]').forEach(btn=>btn.onclick=()=>switchPage(btn.dataset.go));
}
window.bumpGoal=(id,val)=>{ const g=state.goals.find(x=>x.id===id); if(!g) return; g.progress=Math.min(100,g.progress+val); saveState(); renderAll(); };
window.deleteGoal=id=>{ state.goals=state.goals.filter(g=>g.id!==id); saveState(); renderAll(); toast('Goal deleted'); };
function renderTimetable(){ const days=['Mon','Tue','Wed','Thu','Fri','Sat']; let html='<div class="tt-head">Time</div>'+days.map(d=>`<div class="tt-head">${d}</div>`).join(''); const times=['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00']; times.forEach(t=>{ html+=`<div class="tt-time">${t}</div>`; days.forEach(d=>{ const item=state.timetable.find(x=>x.day===d && getTimeStartLabel(x.time)===t); html+=`<div class="tt-cell">${item?`<div class="tt-class" style="background:${item.color}">${escapeHtml(item.name)}<br>${escapeHtml(item.time)}</div>`:''}</div>`; }); }); qs('ttBoard').innerHTML=html; qs('ttList').innerHTML=state.timetable.length ? state.timetable.map(t=>`<div class="tt-item"><div><div class="item-title">${escapeHtml(t.name)}</div><div class="item-meta">${t.day} • ${escapeHtml(t.time)}</div></div><div><span style="display:inline-block;width:12px;height:12px;border-radius:999px;background:${t.color}"></span></div><div class="item-actions"><button class="icon-btn delete" onclick="deleteTt('${t.id}')">Delete</button></div></div>`).join('') : '<div class="empty"><strong>No timetable entries</strong>Add classes to build your weekly timetable.</div>'; }
window.deleteTt=id=>{ state.timetable=state.timetable.filter(t=>t.id!==id); saveState(); renderAll(); toast('Timetable class deleted'); };
function renderAnalytics(){ const total=state.tasks.length; const done=state.tasks.filter(t=>t.done).length; const rate=total?Math.round(done/total*100):0; qs('completionRate').textContent=rate+'%'; qs('habitRate').textContent=state.habits.reduce((a,h)=>a+h.days.filter(Boolean).length,0); const avg=state.grades.length?(state.grades.reduce((a,b)=>a+b.score,0)/state.grades.length):0; qs('avgGrade').textContent=avg.toFixed(1); qs('goalRate').textContent=state.goals.filter(g=>g.progress>=100).length; set2('analyticsHeroChip',rate+'% tasks complete'); set2('analyticsHeroSub',total ? `${done} of ${total} tasks done, averaging ${avg.toFixed(1)} across ${state.grades.length} recorded grade${state.grades.length===1?'':'s'}.` : 'Add tasks, grades, and habits to see your progress here.'); renderProgressOverview(); }
function renderProgressOverview(){
  const focusSessions=state.focusSessions.filter(s=>s.mode===1500);
  set2('paTotalTasks',state.tasks.filter(t=>t.done).length);
  set2('paStudyHours',(minutesFromSessions(focusSessions)/60).toFixed(1)+'h');
  set2('paPomodoros',focusSessions.length);  const dsaSolved=store.get('dsa_solved',[]); set2('paDsaSolved',`${Array.isArray(dsaSolved)?Math.min(75,dsaSolved.length):0}/75`);
  const now=new Date(); let streak=0;
  for(let i=0;i<365;i++){ const d=new Date(now); d.setDate(now.getDate()-i); d.setHours(0,0,0,0); const key=d.toISOString().slice(0,10); const has=focusSessions.some(s=>new Date(s.at).toISOString().slice(0,10)===key); if(has) streak++; else break; }
  set2('paStreak',streak+' days');
}
let weeklyFocusChart=null;
function renderCharts(){ renderAnalytics(); const pctx=qs('priorityChart'); const gctx=qs('gradeChart'); if(!pctx || !gctx) return; if(typeof Chart==='undefined'){ pctx.outerHTML='<div class="empty"><strong>Charts unavailable</strong>Chart library could not load in this browser session.</div>'; gctx.outerHTML='<div class="empty"><strong>Charts unavailable</strong>Reload once with internet access to display analytics charts.</div>'; return; } if(priorityChart) priorityChart.destroy(); if(gradeChart) gradeChart.destroy(); priorityChart=new Chart(pctx,{type:'doughnut',data:{labels:['Low','Medium','High'],datasets:[{data:['low','medium','high'].map(p=>state.tasks.filter(t=>t.priority===p).length)}]},options:{plugins:{legend:{position:'bottom'}}}}); gradeChart=new Chart(gctx,{type:'bar',data:{labels:state.grades.map(g=>g.subject),datasets:[{label:'Score',data:state.grades.map(g=>g.score)}]},options:{scales:{y:{beginAtZero:true,max:100}},plugins:{legend:{display:false}}}});

  const wctx=qs('weeklyFocusChart');
  if(wctx){
    if(weeklyFocusChart) weeklyFocusChart.destroy();
    const labels=[]; const data=[];
    for(let i=6;i>=0;i--){
      const d=new Date(); d.setDate(d.getDate()-i); d.setHours(0,0,0,0);
      const key=d.toISOString().slice(0,10);
      labels.push(d.toLocaleDateString(undefined,{weekday:'short'}));
      data.push(state.focusSessions.filter(s=>s.mode===1500 && new Date(s.at).toISOString().slice(0,10)===key).length);
    }
    weeklyFocusChart=new Chart(wctx,{type:'bar',data:{labels,datasets:[{label:'Focus sessions',data,backgroundColor:'#2563eb',borderRadius:8,maxBarThickness:36}]},options:{scales:{y:{beginAtZero:true,ticks:{stepSize:1}}},plugins:{legend:{display:false}}}});
  }

  // Mon-Sun week window (matches the rest of the app's week calculations)
  const now=new Date(); now.setHours(0,0,0,0);
  const dow=(now.getDay()+6)%7; const monday=new Date(now); monday.setDate(now.getDate()-dow);
  const weekDayLabels=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const weekKeys=weekDayLabels.map((_,i)=>{ const d=new Date(monday); d.setDate(monday.getDate()+i); return d.toISOString().slice(0,10); });

  const shctx=qs('weeklyStudyHoursChart');
  if(shctx){
    if(weeklyStudyHoursChart) weeklyStudyHoursChart.destroy();
    const hoursData=weekKeys.map(key=>+(minutesFromSessions(state.focusSessions.filter(s=>s.mode===1500 && new Date(s.at).toISOString().slice(0,10)===key))/60).toFixed(2));
    weeklyStudyHoursChart=new Chart(shctx,{type:'line',data:{labels:weekDayLabels,datasets:[{label:'Study hours',data:hoursData,borderColor:'#2563eb',backgroundColor:'rgba(37,99,235,.12)',fill:true,tension:.35,pointBackgroundColor:'#2563eb'}]},options:{scales:{y:{beginAtZero:true}},plugins:{legend:{display:false}}}});
  }

  const tcctx=qs('tasksCompletedChart');
  if(tcctx){
    if(tasksCompletedChart) tasksCompletedChart.destroy();
    const completedData=weekKeys.map(key=>state.tasks.filter(t=>t.completedAt && new Date(t.completedAt).toISOString().slice(0,10)===key).length);
    tasksCompletedChart=new Chart(tcctx,{type:'line',data:{labels:weekDayLabels,datasets:[{label:'Tasks completed',data:completedData,borderColor:'#16a34a',backgroundColor:'rgba(22,163,74,.12)',fill:true,tension:.35,pointBackgroundColor:'#16a34a'}]},options:{scales:{y:{beginAtZero:true,ticks:{stepSize:1}}},plugins:{legend:{display:false}}}});
  }

  const sctx=qs('subjectChart');
  if(sctx){
    if(subjectChart) subjectChart.destroy();
    const subjects=[...new Set(state.tasks.map(t=>t.subject||'General'))];
    subjectChart=new Chart(sctx,{type:'doughnut',data:{labels:subjects,datasets:[{data:subjects.map(sub=>state.tasks.filter(t=>(t.subject||'General')===sub).length),backgroundColor:['#2563eb','#16a34a','#f59e0b','#a855f7','#ef4444','#0ea5e9']}]},options:{plugins:{legend:{position:'bottom'}}}});
  }
}

function renderProfile(){
  const auth=loadAuth() || {};
  const settings=state.settings || {};
  const name=settings.profileName || auth.name || 'Student';
  const email=auth.email || 'student@pathpilot.local';
  const career=settings.profileCareerGoal || 'Software Engineering';
  const college=settings.profileCollege || '';
  const graduation=settings.profileGraduationYear || '';

  const initials=(name||'Student').trim().split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();

  const set=(id,val)=>{const el=qs(id);if(el)el.textContent=val;};
  set('profileHeaderAvatar',initials);
  set('profileHeroAvatar',initials);
  set('profileHeroName',name);
  set('profileHeroEmail',email);
  set('profileHeroGoal',career);
  set('sidebarAvatarInitial',initials);
  set('sidebarProfileName',name);
  set('sidebarProfileEmail',email);

  if(qs('profileName') && document.activeElement!==qs('profileName')) qs('profileName').value=name;
  if(qs('profileEmail')) qs('profileEmail').value=email;
  if(qs('profileCareerGoal')) qs('profileCareerGoal').value=career;
  if(qs('profileCollege') && document.activeElement!==qs('profileCollege')) qs('profileCollege').value=college;
  if(qs('profileGraduationYear')) qs('profileGraduationYear').value=graduation;

  const solved=Array.isArray(store.get('dsa_solved',[])) ? store.get('dsa_solved',[]).length : 0;
  const completedTasks=state.tasks.filter(t=>t.done).length;
  const notes=state.notes.length;
  const goals=state.goals.length;
  const focusSessions=state.focusSessions.length;
  const activeHabitDays=state.habits.reduce((sum,h)=>sum+(Array.isArray(h.days)?h.days.filter(Boolean).length:0),0);

  const badges=[
    {icon:'🎯',name:'First Step',desc:'Complete your first meaningful profile or study action.',unlock:!!(name!=='Student' || college || career!=='Software Engineering' || state.tasks.length>0)},
    {icon:'🧭',name:'Path Builder',desc:'Add your college and career goal to your profile.',unlock:!!(college && career)},
    {icon:'✅',name:'Planner',desc:'Complete your first task.',unlock:completedTasks>=1},
    {icon:'📝',name:'Note Keeper',desc:'Create five study notes.',unlock:notes>=5},
    {icon:'💻',name:'Problem Solver',desc:'Solve five DSA problems.',unlock:solved>=5},
    {icon:'⏱️',name:'Focus Builder',desc:'Complete three focused sessions.',unlock:focusSessions>=3},
    {icon:'🔥',name:'Consistency',desc:'Log seven habit check-ins.',unlock:activeHabitDays>=7},
    {icon:'🏆',name:'Momentum',desc:'Complete ten tasks.',unlock:completedTasks>=10},
  ];

  const grid=qs('achievementGrid');
  if(grid){
    grid.innerHTML=badges.map(b=>`
      <div class="achievement-badge ${b.unlock?'unlocked':'locked'}">
        <div class="achievement-icon">${b.icon}</div>
        <div class="achievement-copy">
          <strong>${escapeHtml(b.name)}</strong>
          <span>${escapeHtml(b.desc)}</span>
        </div>
        <div class="achievement-state">${b.unlock?'Unlocked':'Locked'}</div>
      </div>
    `).join('');
  }
}


function renderPremiumDashboard(){
  const solved=Array.isArray(store.get('dsa_solved',[]))?store.get('dsa_solved',[]):[];
  const dsaPct=Math.round(Math.min(100,solved.length/75*100));
  const totalTasks=state.tasks.length, doneTasks=state.tasks.filter(t=>t.done).length;
  const taskPct=totalTasks?Math.round(doneTasks/totalTasks*100):0;
  const cutoff=Date.now()-7*86400000;
  const focusWeek=state.focusSessions.filter(s=>new Date(s.at).getTime()>=cutoff).length;
  const focusPct=Math.round(Math.min(100,focusWeek/5*100));
  const notePct=Math.min(100,Math.round(state.notes.length/5*100));
  const readiness=Math.round(dsaPct*.45+taskPct*.25+focusPct*.20+notePct*.10);

  set2('ppReadinessScore',readiness+'%');
  set2('ppDsaBarPct',dsaPct+'%'); set2('ppTaskBarPct',taskPct+'%'); set2('ppFocusBarPct',focusPct+'%');
  const rb=qs('ppReadinessRing'); if(rb) rb.style.setProperty('--pp-progress',readiness);
  const bars=[['ppDsaBar',dsaPct],['ppTaskBar',taskPct],['ppFocusBar',focusPct]];
  bars.forEach(([id,p])=>{const el=qs(id);if(el)el.style.width=p+'%'});

  let title='Start your first DSA problem', text='One solved problem is enough to start building momentum.', action='dsa';
  if(solved.length<5){ title=`Solve ${Math.min(2,75-solved.length)} DSA ${solved.length?'more problems':'problem'}`; text='Your fastest path to a stronger placement profile is consistent DSA practice.'; action='dsa'; }
  else if(totalTasks===0){ title='Add your first study task'; text='Turn today into a plan and give your study sessions somewhere to go.'; action='tasks'; }
  else if(taskPct<50){ title='Finish one pending task'; text='A small completion streak will lift your execution score.'; action='tasks'; }
  else if(focusPct<40){ title='Start a 25-minute focus session'; text='Protect one distraction-free block and build your consistency streak.'; action='focus'; }
  else { title='Keep the streak alive'; text='You are building good momentum. Push one DSA problem further today.'; action='dsa'; }
  set2('ppNextActionTitle',title); set2('ppNextActionText',text);
  const nb=qs('ppNextActionBtn'); if(nb) nb.onclick=()=>switchPage(action);
  set2('ppMomentumSub',`DSA ${dsaPct}% · Tasks ${taskPct}% · Focus ${focusPct}% · Notes ${notePct}%`);

  const pending=totalTasks-doneTasks;
  const activity=[
    {icon:'✓',title:`${doneTasks} task${doneTasks===1?'':'s'} completed`,sub:pending?`${pending} still pending today`:'Your task list is clear'},
    {icon:'</>',title:`${solved.length} DSA problem${solved.length===1?'':'s'} solved`,sub:'Placement practice progress'},
    {icon:'◷',title:`${focusWeek} focus session${focusWeek===1?'':'s'} this week`,sub:'Consistency is built one block at a time'},
    {icon:'✦',title:`${state.notes.length} note${state.notes.length===1?'':'s'} saved`,sub:'Keep your revision knowledge close'}
  ];
  const list=qs('ppActivityList'); if(list) list.innerHTML=activity.map(a=>`<div class="pp-activity-item"><span>${a.icon}</span><div><strong>${escapeHtml(a.title)}</strong><small>${escapeHtml(a.sub)}</small></div></div>`).join('');
  const dot=qs('ppNotifyDot'); if(dot) dot.classList.toggle('hidden',!(pending||solved.length||focusWeek));
}

const PP_COMMANDS=[
  ['Dashboard','Overview and momentum','dashboard'],['DSA','75-problem placement sheet','dsa'],['DSA Progress','Progress, streak and topics','dsaProgress'],['Study Planner','Plan your work','tasks'],['Analytics','See your progress','analytics'],['Pomodoro','Start a focus session','focus'],['Flashcards','Review active recall cards','flashcards'],['Grades Tracker','Track academic performance','grades'],['Timetable','See your weekly schedule','timetable'],['Calendar','Deadlines and exam dates','calendar'],['Exams','Countdowns for upcoming papers','exams'],['Internships','Placement application pipeline','internships'],['Goals','Track academic targets','goals'],['AI Coach','Study tutor, planner, and quiz','ai'],['Notes','Revision knowledge base','notes'],['Habits','Weekly consistency','habits'],['Profile','Update your profile','settings']
];
function renderCommandPalette(filter=''){
  const el=qs('ppCommandList'); if(!el)return;
  const f=filter.trim().toLowerCase();
  const items=PP_COMMANDS.filter(x=>!f||x[0].toLowerCase().includes(f)||x[1].toLowerCase().includes(f));
  el.innerHTML=items.length?items.map((x,i)=>`<button class="pp-command-item ${i===0?'selected':''}" data-cmd="${x[2]}"><span class="pp-command-icon">${x[0][0]}</span><span><strong>${escapeHtml(x[0])}</strong><small>${escapeHtml(x[1])}</small></span><kbd>↵</kbd></button>`).join(''):'<div class="pp-command-empty">No matching actions</div>';
  el.querySelectorAll('[data-cmd]').forEach(b=>b.onclick=()=>{closeCommandPalette();switchPage(b.dataset.cmd);});
}
function openCommandPalette(){const o=qs('ppPaletteOverlay');if(!o)return;o.classList.remove('hidden');o.classList.add('is-open');o.setAttribute('aria-hidden','false');renderCommandPalette('');setTimeout(()=>qs('ppCommandInput')?.focus(),30)}
function closeCommandPalette(){const o=qs('ppPaletteOverlay');if(!o)return;o.classList.remove('is-open');o.classList.add('hidden');o.setAttribute('aria-hidden','true')}
function openActivity(){qs('ppActivityPopover')?.classList.remove('hidden')}
function closeActivity(){qs('ppActivityPopover')?.classList.add('hidden')}

function renderAll(){
  if(!loadAuth()?.loggedIn) return;
  const renderers=[
    ['stats',renderStats],
    ['dashboard',renderDashboard],
    ['quote',renderQuote],
    ['insight',renderInsight],
    ['dashboardOverview',renderDashboardOverview],
    ['premiumDashboard',renderPremiumDashboard],
    ['todayProgress',renderTodayProgress],
    ['tasks',renderTasks],
    ['notes',renderNotes],
    ['calendar',renderCalendar],
    ['timer',renderTimer],
    ['focusExtras',renderFocusExtras],
    ['focusLog',renderFocusLog],
    ['grades',renderGrades],
    ['habits',renderHabits],
    ['flashcards',renderFlashcards],
    ['exams',renderExams],
    ['goals',renderGoals],
    ['internships',renderInternships],
    ['briefing',renderDailyBriefing],
    ['timetable',renderTimetable],
    ['analytics',renderAnalytics],
    ['profile',renderProfile]
  ];
  for(const [name,fn] of renderers){
    try{
      if(typeof fn==='function') fn();
    }catch(error){
      console.warn(`[PathPilot] ${name} renderer skipped:`,error);
    }
  }
  try{ applyAccentColor(state.settings?.accent||'#2563eb'); }catch(error){}
}

function refreshLiveMetrics(){
  try{ renderStats(); }catch(e){}
  try{ renderDashboardOverview(); }catch(e){}
  try{ renderAnalytics(); }catch(e){}
  try{ if(!qs('analyticsPage')?.classList.contains('hidden')) renderCharts(); }catch(e){}
}
window.PathPilotRefreshMetrics=refreshLiveMetrics;
window.addEventListener('pathpilot:data-changed', refreshLiveMetrics);
window.addEventListener('pathpilot:data-changed', ()=>{ if(!qs('dsaProgressPage')?.classList.contains('hidden')) renderDsaProgress(); });
window.addEventListener('pathpilot:data-changed', ()=>{ try{renderPremiumDashboard();}catch(e){} });;

const AI_MODES = {
  tutor: {
    label: 'Study Tutor', desc: 'Local coach + optional live AI',
    system: 'You are a patient, encouraging study tutor. Explain concepts clearly, use examples, and check understanding.',
    prompts: ['Explain recursion simply','What is normalization in DBMS?','Help me understand OOP concepts']
  },
  planner: {
    label: 'Study Planner', desc: 'Personalized schedule based on your tasks',
    system: 'You are a study planner. Use the student\'s current tasks, exams, and grades to build a realistic, prioritized study schedule.',
    prompts: ['Plan my next 3 days','Build a revision plan for my exams','How should I prioritize my tasks?']
  },
  quiz: {
    label: 'Quiz Me', desc: 'Test your knowledge on any topic',
    system: 'You are a quiz master. Ask one question at a time on the requested topic, wait for the answer, then give feedback and the next question.',
    prompts: ['Quiz me on data structures','Quiz me on operating systems','Quiz me on my weakest subject']
  },
  essay: {
    label: 'Essay Helper', desc: 'Brainstorm, outline, and improve writing',
    system: 'You are a writing coach. Help brainstorm ideas, build outlines, and improve clarity and structure of essays.',
    prompts: ['Help me outline an essay on climate change','Improve this paragraph','Give me a strong thesis statement']
  },
  flashgen: {
    label: 'Flashcard Gen', desc: 'Generate flashcard Q&A pairs',
    system: 'You generate concise flashcard question-and-answer pairs from a topic or notes the student provides. Format as Q: ... A: ... pairs.',
    prompts: ['Make flashcards on the water cycle','Generate flashcards from my DBMS notes','Flashcards on Big-O notation']
  },
  coach: {
    label: 'Motivation Coach', desc: 'Beat procrastination, stay focused',
    system: 'You are a supportive motivation coach for students. Give practical, encouraging advice to beat procrastination and build momentum.',
    prompts: ['I keep procrastinating, help','How do I stay focused for longer?','Give me a pep talk']
  }
};

let aiMode = 'tutor';
let aiHistory = [];
let aiIsTyping = false;

window.setAiMode = function(mode, el) {
  aiMode = mode;
  document.querySelectorAll('.ai-mode-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const m = AI_MODES[mode];
  qs('aiModeLabel').textContent = m.label;
  qs('aiModeDesc').textContent = m.desc;
  renderAiQuickPrompts();
};

function renderAiQuickPrompts() {
  const m = AI_MODES[aiMode];
  qs('aiQuickPrompts').innerHTML = m.prompts.map(p =>
    `<button class="ai-quick-btn" onclick="useQuickPrompt(this.textContent)">${p}</button>`
  ).join('');
}

window.useQuickPrompt = function(text) {
  qs('aiInput').value = text;
  sendAiMessage();
};

function getStudentContext() {
  const pending = state.tasks.filter(t=>!t.done).length;
  const examsArr = state.exams.map(e=>`${e.name} (${e.subject}, ${daysLeft(e.date)})`).join(', ');
  const avg = state.grades.length ? (state.grades.reduce((a,b)=>a+b.score,0)/state.grades.length).toFixed(1) : 'N/A';
  return `\n\n[Student context: ${pending} pending tasks, exams: ${examsArr||'none'}, avg grade: ${avg}]`;
}

function renderAiMessage(role, html) {
  const welcome = qs('aiWelcome');
  if (welcome) welcome.remove();
  const wrap = qs('aiMessages');
  const div = document.createElement('div');
  div.className = `ai-msg ${role}`;
  div.innerHTML = `<div class="ai-msg-avatar">${role==='ai'?'✦':'👤'}</div><div class="ai-msg-bubble">${html}</div>`;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function showTypingIndicator() {
  const welcome = qs('aiWelcome');
  if (welcome) welcome.remove();
  const wrap = qs('aiMessages');
  const div = document.createElement('div');
  div.className = 'ai-msg ai';
  div.id = 'aiTypingIndicator';
  div.innerHTML = `<div class="ai-msg-avatar">✦</div><div class="ai-typing"><span></span><span></span><span></span></div>`;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById('aiTypingIndicator');
  if (el) el.remove();
}

function mdToHtml(text) {
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`(.+?)`/g,'<code>$1</code>')
    .replace(/^### (.+)$/gm,'<strong>$1</strong>')
    .replace(/^## (.+)$/gm,'<strong>$1</strong>')
    .replace(/^# (.+)$/gm,'<strong>$1</strong>')
    .replace(/^\d+\.\s(.+)$/gm,'<li>$1</li>')
    .replace(/^[-*]\s(.+)$/gm,'<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, s=>`<ul>${s}</ul>`)
    .replace(/\n\n/g,'</p><p>')
    .replace(/\n/g,'<br>')
    .replace(/^(.+)$/,'<p>$1</p>');
}

function generateLocalCoachReply(mode, text){
  const q=String(text||'').toLowerCase();
  const pending=state.tasks.filter(t=>!t.done);
  const exams=[...state.exams].sort((a,b)=>daysLeft(a.date)-daysLeft(b.date));
  const internships=internList();
  const next=nextDsaProblem();
  const solvedCount=(store.get('dsa_solved',[])||[]).length;
  const avg=state.grades.length?(state.grades.reduce((a,b)=>a+b.score,0)/state.grades.length).toFixed(1):'N/A';
  const bank=[
    {k:['recursion'],a:'Recursion is a function calling itself with a smaller input until a base case stops it. Write the base case first, then the recursive step. Example: factorial(n) = n * factorial(n-1), with factorial(0)=1.'},
    {k:['normaliz','1nf','2nf','3nf'],a:'Normalization reduces redundancy. 1NF: atomic values. 2NF: no partial dependency on a composite key. 3NF: no transitive dependency. Start with 3NF for most student schemas unless you need denormalization for speed.'},
    {k:['oop','object oriented','encapsulation'],a:'OOP organizes code as objects: encapsulation hides internals, inheritance reuses structure, polymorphism lets one interface have many implementations. Prefer composition when inheritance gets messy.'},
    {k:['binary search'],a:'Binary search needs a sorted range. Compare the midpoint, then discard half the search space. Time complexity is O(log n). Watch off-by-one errors on low/high updates.'},
    {k:['big-o','big o','complexity'],a:'Big-O describes growth, not exact time. Arrays: index O(1), search O(n). Hash maps: average O(1) lookup. Nested loops over n are often O(n²). Interviewers want the tightest bound and why.'},
    {k:['os','operating system','deadlock'],a:'An OS manages CPU, memory, and I/O. Deadlock needs mutual exclusion, hold-and-wait, no preemption, and circular wait. Break any one condition to prevent it.'}
  ];
  const hit=bank.find(item=>item.k.some(k=>q.includes(k)));

  if(mode==='planner'){
    const lines=['**3-day PathPilot plan** based on your workspace:',''];
    lines.push(`1. **Today** — ${pending[0]?`Finish "${pending[0].title}"`:'Clear one study task'}${next?`, then solve **${next.name}** (${next.difficulty}).`:'.'}`);
    lines.push(`2. **Tomorrow** — ${exams[0]?`Revise ${exams[0].subject} (${daysLeft(exams[0].date)} days to ${exams[0].name}).`:'Do a 25-minute Pomodoro and log a note.'}`);
    const hot=internships.find(x=>['oa','interview'].includes(x.status));
    lines.push(`3. **Day 3** — ${hot?`Prep for ${hot.company} (${INTERN_STATUSES[hot.status]}).`:'Move one internship from wishlist to applied, then review flashcards.'}`);
    lines.push('','Keep sessions to 25–50 minutes. Your average grade is **'+avg+'** and DSA solved is **'+solvedCount+'/75**.');
    return lines.join('\n');
  }
  if(mode==='quiz'){
    const quizzes=[
      {q:'What is the time complexity of binary search on a sorted array?',a:'O(log n).'},
      {q:'Name the four deadlock conditions.',a:'Mutual exclusion, hold-and-wait, no preemption, circular wait.'},
      {q:'What does 3NF forbid?',a:'Transitive dependencies of non-key attributes.'}
    ];
    const item=quizzes[Math.floor(Math.random()*quizzes.length)];
    return `**Quiz**\n\n${item.q}\n\nThink first, then check: *${item.a}*\n\nWant another? Ask "quiz me again".`;
  }
  if(mode==='flashgen'){
    const note=state.notes[0];
    return `**Flashcards**\n\nQ: What should I revise next?\nA: ${next?next.name+' ('+next.topic+')':'A weak DSA topic from your sheet'}.\n\nQ: ${note?note.title:'What is PathPilot for?'}\nA: ${note?(note.body||'Your saved note'):'One workspace for study, DSA, and placements.'}\n\nAdd these in Flashcards when they feel useful.`;
  }
  if(mode==='essay'){
    return `**Outline**\n\n1. Hook — why this topic matters for a student career.\n2. Claim — one clear thesis in a sentence.\n3. Evidence — 2–3 points, each with an example.\n4. Counterpoint — address one objection.\n5. Close — what the reader should do next.\n\nPaste a paragraph and I can tighten the structure even without a live API key.`;
  }
  if(mode==='coach'){
    const internHot=internships.filter(x=>['applied','oa','interview'].includes(x.status)).length;
    return `You have **${pending.length}** open task${pending.length===1?'':'s'}, **${solvedCount}/75** DSA done, and **${internHot}** live application${internHot===1?'':'s'}.\n\nDo the smallest next win: ${pending[0]?'complete "'+pending[0].title+'"':'solve one DSA problem'} in a 25-minute focus block. Momentum beats motivation.`;
  }
  if(hit) return hit.a+'\n\n'+getStudentContext().trim();
  return `I can help with that using your PathPilot data.\n\n- Next DSA: **${next?next.name:'sheet complete'}**\n- Next task: **${pending[0]?pending[0].title:'none pending'}**\n- Next exam: **${exams[0]?exams[0].name+' in '+daysLeft(exams[0].date)+' days':'none logged'}**\n\nAsk me to **plan your week**, **quiz you**, or **explain a concept** like recursion, DBMS, or Big-O. For live model answers, tap ✦ and add an OpenRouter key.`;
}

window.sendAiMessage = async function() {
  const input = qs('aiInput');
  const text = input.value.trim();
  if (!text || aiIsTyping) return;
  input.value = '';
  input.style.height = '';
  aiIsTyping = true;
  qs('aiSendBtn').disabled = true;
  renderAiMessage('user', mdToHtml(text));
  aiHistory.push({ role: 'user', content: text });
  showTypingIndicator();
  const mode = AI_MODES[aiMode];
  const systemPrompt = mode.system + (aiMode==='planner'?getStudentContext():'');
  const API_KEY = localStorage.getItem('pathpilot-openrouter-key') || '';
  if(!API_KEY){
    await new Promise(r=>setTimeout(r,280));
    const reply=generateLocalCoachReply(aiMode,text);
    aiHistory.push({ role: 'assistant', content: reply });
    removeTypingIndicator();
    renderAiMessage('ai', mdToHtml(reply));
    aiIsTyping = false;
    qs('aiSendBtn').disabled = false;
    qs('aiInput')?.focus();
    return;
  }
  try {
const resp = await fetch(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    method: "POST",

    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      model: "openai/gpt-3.5-turbo",

      messages: [
        {
          role: "system",
          content: systemPrompt
        },

        {
          role: "user",
          content: text
        }
      ]

    })
  }
);

const data = await resp.json();

console.log(data);

if (!resp.ok) {

  removeTypingIndicator();

  renderAiMessage(
    'ai',
    `<p>⚠️ ${data.error?.message || 'AI request failed'}</p>`
  );

  aiIsTyping = false;

  qs('aiSendBtn').disabled = false;

  return;
}

const reply =
  data.choices?.[0]?.message?.content ||
  "No response received.";
    aiHistory.push({ role: 'assistant', content: reply });
    removeTypingIndicator();
    renderAiMessage('ai', mdToHtml(reply));
  } catch(e) {
    removeTypingIndicator();
    renderAiMessage('ai', '<p>⚠️ Connection error. Please check your internet and try again.</p>');
  }
  aiIsTyping = false;
  qs('aiSendBtn').disabled = false;
  qs('aiInput').focus();
};

window.clearAiChat = function() {
  aiHistory = [];
  qs('aiMessages').innerHTML = `<div class="ai-welcome" id="aiWelcome"><div class="ai-welcome-icon">✦</div><h3>AI Study Assistant</h3><p>Choose a mode on the left, then ask me anything! I can tutor you, build a study plan, quiz you, help with essays, and more.</p></div>`;
};

window.setAiApiKey = function() {
  const current = localStorage.getItem('pathpilot-openrouter-key') || '';
  const key = window.prompt('Enter your OpenRouter API key (stored only in this browser). Get a free one at openrouter.ai/keys', current);
  if(key===null) return;
  if(key.trim()){
    localStorage.setItem('pathpilot-openrouter-key', key.trim());
    toast('AI API key saved');
  } else {
    localStorage.removeItem('pathpilot-openrouter-key');
    toast('AI API key cleared','info');
  }
};

window.aiInputKeydown = function(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAiMessage(); }
};

window.autoResizeAiInput = function(el) {
  el.style.height = '';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
};

// Init AI prompts on page load
setTimeout(renderAiQuickPrompts, 100);

/* ============================================================
   ADVANCED PATHPILOT OS ENHANCEMENTS
   Web Audio, Heatmap, ATS Resume Studio, Mock Interviews, Portfolio, Code Runner
   ============================================================ */

// ── Web Audio Tactile Sound Engine ──
let audioCtx = null;
function playUiSound(type = 'click') {
  if (state?.settings?.soundEffects === false) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(350, t + 0.035);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.035);
      osc.start(t);
      osc.stop(t + 0.035);
    } else if (type === 'success') {
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, t + i * 0.055);
        g.gain.setValueAtTime(0.06, t + i * 0.055);
        g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.055 + 0.28);
        o.start(t + i * 0.055);
        o.stop(t + i * 0.055 + 0.28);
      });
    } else if (type === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(1760, t + 0.12);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.start(t);
      osc.stop(t + 0.35);
    } else if (type === 'bell') {
      [440, 880, 1320].forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0.07 / (idx + 1), t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
        o.start(t);
        o.stop(t + 1.2);
      });
    }
  } catch (e) {}
}

// ── 365-Day Study & Consistency Heatmap ──
function renderStudyHeatmap() {
  const container = qs('dashboardHeatmapMatrix');
  if (!container) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysToRender = 52 * 7;
  const oneDayMs = 86400000;
  const dayOfWeek = today.getDay();
  const startDay = new Date(today.getTime() - (daysToRender - 1 - dayOfWeek) * oneDayMs);

  const activityMap = {};

  (state.focusSessions || []).forEach(s => {
    const key = new Date(s.at || s.date || Date.now()).toISOString().slice(0, 10);
    activityMap[key] = (activityMap[key] || 0) + 2;
  });

  (state.tasks || []).filter(t => t.done && t.completedAt).forEach(t => {
    const key = new Date(t.completedAt).toISOString().slice(0, 10);
    activityMap[key] = (activityMap[key] || 0) + 1;
  });

  const solvedTimes = store.get('dsa_solved_times', {}) || {};
  Object.values(solvedTimes).forEach(ts => {
    const key = new Date(ts).toISOString().slice(0, 10);
    activityMap[key] = (activityMap[key] || 0) + 3;
  });

  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;
  let totalContributions = 0;

  const days = [];
  for (let i = 0; i < daysToRender; i++) {
    const d = new Date(startDay.getTime() + i * oneDayMs);
    const key = d.toISOString().slice(0, 10);
    const score = activityMap[key] || 0;
    totalContributions += score;

    if (score > 0) {
      tempStreak++;
      if (tempStreak > maxStreak) maxStreak = tempStreak;
    } else {
      tempStreak = 0;
    }

    days.push({ date: d, key, score });
  }

  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].date > today) continue;
    if (days[i].score > 0) {
      currentStreak++;
    } else if (days[i].key === today.toISOString().slice(0, 10)) {
      continue;
    } else {
      break;
    }
  }

  if (qs('hmCurrentStreak')) qs('hmCurrentStreak').textContent = `${currentStreak} day${currentStreak === 1 ? '' : 's'}`;
  if (qs('hmBestStreak')) qs('hmBestStreak').textContent = `${Math.max(currentStreak, maxStreak)} day${maxStreak === 1 ? '' : 's'}`;
  if (qs('hmTotalContrib')) qs('hmTotalContrib').textContent = totalContributions;

  container.innerHTML = days.map(d => {
    let level = 'level-0';
    if (d.score >= 6) level = 'level-4';
    else if (d.score >= 4) level = 'level-3';
    else if (d.score >= 2) level = 'level-2';
    else if (d.score > 0) level = 'level-1';

    const dateFormatted = d.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    const tip = `${dateFormatted}: ${d.score} contribution${d.score === 1 ? '' : 's'}`;
    return `<div class="hm-tile ${level}" title="${escapeAttr(tip)}" data-date="${d.key}"></div>`;
  }).join('');
}

// ── ATS Resume Studio & Scanner ──
const sampleSweJobDesc = `We are seeking a high-performing Software Engineering Intern to join our team. 
Key Responsibilities:
- Design, build, and maintain efficient, reusable, and reliable web applications and microservices.
- Collaborate with cross-functional teams to integrate RESTful APIs and modern user interfaces.
- Write clean, maintainable code with unit and integration tests.
- Participate in agile code reviews, design discussions, and system architecture planning.

Required Qualifications:
- Pursuing a B.S. or M.S. in Computer Science, Software Engineering, or related field.
- Strong proficiency in modern JavaScript, TypeScript, Python, or Java.
- Hands-on experience with frontend frameworks like React, Next.js, or Vue.
- Solid understanding of Data Structures & Algorithms, Object-Oriented Programming, and System Design.
- Familiarity with SQL/NoSQL databases (PostgreSQL, MongoDB, Redis).
- Experience with Git version control, Docker containers, and CI/CD pipelines (GitHub Actions).
- Proven ability to solve complex problems and communicate technical decisions effectively.`;

function getResumeState() {
  if (!state.resume) {
    state.resume = {
      personal: {
        fullName: state.settings?.profileName || 'Alex Rivera',
        email: 'alex.rivera@university.edu',
        phone: '+1 (555) 349-2810',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexrivera-cs',
        github: 'github.com/alexrivera',
        portfolio: 'alexrivera.dev',
        summary: 'Aspiring Software Engineer & Computer Science student with a strong foundation in Data Structures, Algorithms, and full-stack web development. Experienced in engineering resilient cloud backends, modern responsive frontends, and automated CI/CD pipelines.'
      },
      education: [
        {
          id: uid(),
          institution: state.settings?.profileCollege || 'State University of Technology',
          degree: 'B.S. in Computer Science',
          location: 'San Francisco, CA',
          graduation: state.settings?.profileGraduationYear ? 'May ' + state.settings.profileGraduationYear : 'May 2026',
          gpa: '3.85 / 4.0',
          courses: 'Data Structures & Algorithms, Operating Systems, Database Management, Computer Networks, Software Engineering'
        }
      ],
      experience: [
        {
          id: uid(),
          company: 'TechNova Solutions',
          role: 'Software Engineering Intern',
          location: 'Remote',
          startDate: 'Jun 2025',
          endDate: 'Aug 2025',
          bullets: [
            'Architected and deployed high-throughput REST APIs using Node.js and PostgreSQL, reducing endpoint response times by 32%.',
            'Engineered responsive React and TypeScript UI components with 95% test coverage, serving 45,000+ monthly active users.',
            'Automated CI/CD build pipelines using GitHub Actions, decreasing release cycle duration from 25 minutes to 4 minutes.'
          ]
        }
      ],
      projects: [
        {
          id: uid(),
          name: 'PathPilot — Student Career OS',
          tech: 'JavaScript (ES6+), HTML5, CSS3, Web APIs',
          link: 'https://pathpilot.app',
          github: 'https://github.com/alexrivera/pathpilot',
          bullets: [
            'Built an offline-first productivity and placement platform with interactive DSA sandbox and ATS resume analyzer.',
            'Implemented client-side test execution engine and SuperMemo SM-2 spaced repetition active recall algorithms.',
            'Optimized DOM rendering to achieve sub-40ms page transitions and 100/100 Lighthouse performance score.'
          ]
        },
        {
          id: uid(),
          name: 'Distributed Real-Time Collaboration Engine',
          tech: 'Go, WebSockets, Redis, Docker',
          link: '',
          github: 'https://github.com/alexrivera/dist-engine',
          bullets: [
            'Developed a low-latency pub/sub message broker capable of streaming 12,000+ concurrent WebSocket events per second.',
            'Configured Redis caching and connection heartbeats to maintain zero packet drop during simulated failovers.'
          ]
        }
      ],
      skills: {
        languages: 'JavaScript, TypeScript, Python, C++, Java, SQL, HTML5/CSS3',
        frameworks: 'React, Next.js, Node.js, Express, Tailwind CSS, FastAPI',
        tools: 'Git, Docker, AWS (S3, Lambda), GitHub Actions, Linux, Postman',
        concepts: 'Data Structures & Algorithms, RESTful APIs, System Design, OOP, CI/CD'
      },
      certifications: [
        { id: uid(), name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2025' },
        { id: uid(), name: 'Meta Front-End Developer Professional Certificate', issuer: 'Coursera', year: '2024' }
      ],
      theme: 'modern'
    };
    saveState();
  }
  return state.resume;
}

function renderResumeStudio() {
  const resume = getResumeState();
  const currentTheme = resume.theme || 'modern';
  document.querySelectorAll('.res-theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === currentTheme);
  });

  if (qs('resName')) qs('resName').value = resume.personal.fullName || '';
  if (qs('resEmail')) qs('resEmail').value = resume.personal.email || '';
  if (qs('resPhone')) qs('resPhone').value = resume.personal.phone || '';
  if (qs('resLocation')) qs('resLocation').value = resume.personal.location || '';
  if (qs('resLinkedin')) qs('resLinkedin').value = resume.personal.linkedin || '';
  if (qs('resGithub')) qs('resGithub').value = resume.personal.github || '';
  if (qs('resPortfolio')) qs('resPortfolio').value = resume.personal.portfolio || '';
  if (qs('resSummary')) qs('resSummary').value = resume.personal.summary || '';

  if (qs('resSkillLanguages')) qs('resSkillLanguages').value = resume.skills.languages || '';
  if (qs('resSkillFrameworks')) qs('resSkillFrameworks').value = resume.skills.frameworks || '';
  if (qs('resSkillTools')) qs('resSkillTools').value = resume.skills.tools || '';
  if (qs('resSkillConcepts')) qs('resSkillConcepts').value = resume.skills.concepts || '';

  const eduContainer = qs('resumeEduList');
  if (eduContainer) {
    eduContainer.innerHTML = (resume.education || []).map(e => `
      <div class="res-card-item" data-id="${e.id}">
        <div class="res-card-item-top">
          <strong>${escapeHtml(e.institution || 'School')}</strong>
          <button class="res-card-remove" onclick="removeResumeItem('education', '${e.id}')" title="Remove">&times;</button>
        </div>
        <div class="resume-field-grid">
          <label>Institution <input class="input" value="${escapeAttr(e.institution || '')}" oninput="updateResumeItem('education', '${e.id}', 'institution', this.value)" /></label>
          <label>Degree / Major <input class="input" value="${escapeAttr(e.degree || '')}" oninput="updateResumeItem('education', '${e.id}', 'degree', this.value)" /></label>
          <label>Graduation Date <input class="input" value="${escapeAttr(e.graduation || '')}" oninput="updateResumeItem('education', '${e.id}', 'graduation', this.value)" /></label>
          <label>GPA <input class="input" value="${escapeAttr(e.gpa || '')}" oninput="updateResumeItem('education', '${e.id}', 'gpa', this.value)" /></label>
        </div>
        <label style="margin-top:8px;display:block;font-size:12px;font-weight:700;color:#475569;">Relevant Coursework
          <input class="input" value="${escapeAttr(e.courses || '')}" oninput="updateResumeItem('education', '${e.id}', 'courses', this.value)" />
        </label>
      </div>
    `).join('');
  }

  const expContainer = qs('resumeExpList');
  if (expContainer) {
    expContainer.innerHTML = (resume.experience || []).map(exp => `
      <div class="res-card-item" data-id="${exp.id}">
        <div class="res-card-item-top">
          <strong>${escapeHtml(exp.role || 'Role')} at ${escapeHtml(exp.company || 'Company')}</strong>
          <button class="res-card-remove" onclick="removeResumeItem('experience', '${exp.id}')" title="Remove">&times;</button>
        </div>
        <div class="resume-field-grid">
          <label>Company <input class="input" value="${escapeAttr(exp.company || '')}" oninput="updateResumeItem('experience', '${exp.id}', 'company', this.value)" /></label>
          <label>Role <input class="input" value="${escapeAttr(exp.role || '')}" oninput="updateResumeItem('experience', '${exp.id}', 'role', this.value)" /></label>
          <label>Start Date <input class="input" value="${escapeAttr(exp.startDate || '')}" oninput="updateResumeItem('experience', '${exp.id}', 'startDate', this.value)" /></label>
          <label>End Date <input class="input" value="${escapeAttr(exp.endDate || '')}" oninput="updateResumeItem('experience', '${exp.id}', 'endDate', this.value)" /></label>
        </div>
        <label style="margin-top:8px;display:block;font-size:12px;font-weight:700;color:#475569;">Bullet Points (One per line)
          <textarea class="textarea" rows="4" oninput="updateResumeBullets('experience', '${exp.id}', this.value)">${escapeHtml((exp.bullets || []).join('\n'))}</textarea>
        </label>
      </div>
    `).join('');
  }

  const projContainer = qs('resumeProjList');
  if (projContainer) {
    projContainer.innerHTML = (resume.projects || []).map(p => `
      <div class="res-card-item" data-id="${p.id}">
        <div class="res-card-item-top">
          <strong>${escapeHtml(p.name || 'Project Name')}</strong>
          <button class="res-card-remove" onclick="removeResumeItem('projects', '${p.id}')" title="Remove">&times;</button>
        </div>
        <div class="resume-field-grid">
          <label>Project Name <input class="input" value="${escapeAttr(p.name || '')}" oninput="updateResumeItem('projects', '${p.id}', 'name', this.value)" /></label>
          <label>Technologies Used <input class="input" value="${escapeAttr(p.tech || '')}" oninput="updateResumeItem('projects', '${p.id}', 'tech', this.value)" /></label>
          <label>Live Demo Link <input class="input" value="${escapeAttr(p.link || '')}" oninput="updateResumeItem('projects', '${p.id}', 'link', this.value)" /></label>
          <label>GitHub Link <input class="input" value="${escapeAttr(p.github || '')}" oninput="updateResumeItem('projects', '${p.id}', 'github', this.value)" /></label>
        </div>
        <label style="margin-top:8px;display:block;font-size:12px;font-weight:700;color:#475569;">Impact Bullets (One per line)
          <textarea class="textarea" rows="3" oninput="updateResumeBullets('projects', '${p.id}', this.value)">${escapeHtml((p.bullets || []).join('\n'))}</textarea>
        </label>
      </div>
    `).join('');
  }

  const certContainer = qs('resumeCertList');
  if (certContainer) {
    certContainer.innerHTML = (resume.certifications || []).map(c => `
      <div class="res-card-item" data-id="${c.id}">
        <div class="res-card-item-top">
          <strong>${escapeHtml(c.name || 'Certification')}</strong>
          <button class="res-card-remove" onclick="removeResumeItem('certifications', '${c.id}')" title="Remove">&times;</button>
        </div>
        <div class="resume-field-grid">
          <label>Certification Name <input class="input" value="${escapeAttr(c.name || '')}" oninput="updateResumeItem('certifications', '${c.id}', 'name', this.value)" /></label>
          <label>Issuing Organization <input class="input" value="${escapeAttr(c.issuer || '')}" oninput="updateResumeItem('certifications', '${c.id}', 'issuer', this.value)" /></label>
          <label>Year <input class="input" value="${escapeAttr(c.year || '')}" oninput="updateResumeItem('certifications', '${c.id}', 'year', this.value)" /></label>
        </div>
      </div>
    `).join('');
  }

  renderLiveResumePaper();
  updateResumePageMeter();
}

function renderLiveResumePaper() {
  const paper = qs('resumePaper');
  if (!paper) return;

  const resume = getResumeState();
  const theme = resume.theme || 'modern';
  paper.className = `resume-paper ${theme}`;

  const p = resume.personal || {};
  const contactParts = [];
  if (p.phone) contactParts.push(`<span>${escapeHtml(p.phone)}</span>`);
  if (p.email) contactParts.push(`<a href="mailto:${escapeAttr(p.email)}">${escapeHtml(p.email)}</a>`);
  if (p.location) contactParts.push(`<span>${escapeHtml(p.location)}</span>`);
  if (p.linkedin) contactParts.push(`<a href="https://${escapeAttr(p.linkedin.replace(/^https?:\/\//, ''))}" target="_blank">${escapeHtml(p.linkedin)}</a>`);
  if (p.github) contactParts.push(`<a href="https://${escapeAttr(p.github.replace(/^https?:\/\//, ''))}" target="_blank">${escapeHtml(p.github)}</a>`);
  if (p.portfolio) contactParts.push(`<a href="https://${escapeAttr(p.portfolio.replace(/^https?:\/\//, ''))}" target="_blank">${escapeHtml(p.portfolio)}</a>`);

  paper.innerHTML = `
    <h1>${escapeHtml(p.fullName || 'Alex Rivera')}</h1>
    <div class="resume-header-contact">
      ${contactParts.join(' &nbsp;•&nbsp; ')}
    </div>

    ${p.summary ? `
      <div class="resume-section-title">Professional Summary</div>
      <p style="margin:4px 0 10px;color:#1e293b;font-size:11.5px;line-height:1.5;">${escapeHtml(p.summary)}</p>
    ` : ''}

    <div class="resume-section-title">Education</div>
    ${(resume.education || []).map(e => `
      <div class="resume-row-item">
        <div class="resume-row-head">
          <span>${escapeHtml(e.institution || '')}</span>
          <span>${escapeHtml(e.graduation || '')}</span>
        </div>
        <div class="resume-row-sub">
          <span>${escapeHtml(e.degree || '')}${e.gpa ? ` &nbsp;•&nbsp; GPA: ${escapeHtml(e.gpa)}` : ''}</span>
          <span>${escapeHtml(e.location || '')}</span>
        </div>
        ${e.courses ? `<div style="font-size:11px;color:#334155;"><strong>Relevant Coursework:</strong> ${escapeHtml(e.courses)}</div>` : ''}
      </div>
    `).join('')}

    ${(resume.experience && resume.experience.length) ? `
      <div class="resume-section-title">Experience</div>
      ${resume.experience.map(exp => `
        <div class="resume-row-item">
          <div class="resume-row-head">
            <span>${escapeHtml(exp.role || '')} — <strong>${escapeHtml(exp.company || '')}</strong></span>
            <span>${escapeHtml(exp.startDate || '')} – ${escapeHtml(exp.endDate || '')}</span>
          </div>
          <div class="resume-row-sub">
            <span>${escapeHtml(exp.location || '')}</span>
          </div>
          <ul class="resume-bullet-list">
            ${(exp.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    ` : ''}

    ${(resume.projects && resume.projects.length) ? `
      <div class="resume-section-title">Technical Projects</div>
      ${resume.projects.map(proj => `
        <div class="resume-row-item">
          <div class="resume-row-head">
            <span><strong>${escapeHtml(proj.name || '')}</strong> ${proj.tech ? `| <em>${escapeHtml(proj.tech)}</em>` : ''}</span>
            <span>${proj.github ? `<a href="${escapeAttr(proj.github)}" target="_blank" style="color:#2563eb;text-decoration:none;">GitHub ↗</a>` : ''}</span>
          </div>
          <ul class="resume-bullet-list">
            ${(proj.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    ` : ''}

    <div class="resume-section-title">Technical Skills</div>
    <div class="resume-skills-block">
      ${resume.skills.languages ? `<div class="resume-skill-line"><strong>Languages:</strong> ${escapeHtml(resume.skills.languages)}</div>` : ''}
      ${resume.skills.frameworks ? `<div class="resume-skill-line"><strong>Frameworks &amp; Libraries:</strong> ${escapeHtml(resume.skills.frameworks)}</div>` : ''}
      ${resume.skills.tools ? `<div class="resume-skill-line"><strong>Tools &amp; Cloud:</strong> ${escapeHtml(resume.skills.tools)}</div>` : ''}
      ${resume.skills.concepts ? `<div class="resume-skill-line"><strong>Core Concepts:</strong> ${escapeHtml(resume.skills.concepts)}</div>` : ''}
    </div>

    ${(resume.certifications && resume.certifications.length) ? `
      <div class="resume-section-title">Certifications &amp; Honors</div>
      <ul class="resume-bullet-list">
        ${resume.certifications.map(c => `<li><strong>${escapeHtml(c.name || '')}</strong> — ${escapeHtml(c.issuer || '')} (${escapeHtml(c.year || '')})</li>`).join('')}
      </ul>
    ` : ''}
  `;
  updateResumePageMeter();
}

window.removeResumeItem = function(section, id) {
  const resume = getResumeState();
  if (Array.isArray(resume[section])) {
    resume[section] = resume[section].filter(item => item.id !== id);
    saveState();
    renderResumeStudio();
    playUiSound('click');
  }
};

window.updateResumeItem = function(section, id, field, value) {
  const resume = getResumeState();
  if (Array.isArray(resume[section])) {
    const item = resume[section].find(x => x.id === id);
    if (item) {
      item[field] = value;
      saveState();
      renderLiveResumePaper();
    }
  }
};

window.updateResumeBullets = function(section, id, rawText) {
  const resume = getResumeState();
  if (Array.isArray(resume[section])) {
    const item = resume[section].find(x => x.id === id);
    if (item) {
      item.bullets = rawText.split('\n').map(s => s.trim()).filter(Boolean);
      saveState();
      renderLiveResumePaper();
    }
  }
};

const TECH_KEYWORDS = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'go', 'rust', 'sql', 'nosql',
  'react', 'next.js', 'vue', 'angular', 'node.js', 'express', 'django', 'fastapi', 'spring boot',
  'html', 'css', 'tailwind', 'graphql', 'rest', 'apis', 'grpc', 'microservices',
  'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'git', 'github', 'docker', 'kubernetes', 'aws',
  'gcp', 'azure', 'ci/cd', 'github actions', 'linux', 'data structures', 'algorithms', 'system design', 'oop',
  'distributed systems', 'concurrency', 'unit testing', 'kafka'
];

window.insertKeywordToResume = function(keyword) {
  playUiSound('click');
  const resume = getResumeState();
  if (!resume.skills) resume.skills = { languages: '', frameworks: '', tools: '', concepts: '' };

  const lower = keyword.toLowerCase();
  let targetField = 'tools';
  if (['javascript', 'typescript', 'python', 'java', 'c++', 'go', 'rust', 'sql', 'html', 'css'].includes(lower)) {
    targetField = 'languages';
  } else if (['react', 'next.js', 'vue', 'angular', 'node.js', 'express', 'django', 'fastapi', 'spring boot', 'tailwind'].includes(lower)) {
    targetField = 'frameworks';
  } else if (['data structures', 'algorithms', 'system design', 'oop', 'distributed systems', 'concurrency', 'microservices', 'apis', 'rest', 'grpc'].includes(lower)) {
    targetField = 'concepts';
  }

  const existing = (resume.skills[targetField] || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!existing.some(s => s.toLowerCase() === lower)) {
    existing.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    resume.skills[targetField] = existing.join(', ');
    saveState();
    renderResumeStudio();
    runAtsScan();
    toast(`Inserted "${keyword}" into Technical Skills!`, 'success');
  } else {
    toast(`"${keyword}" is already in your skills`, 'info');
  }
};

function updateResumePageMeter() {
  const paper = qs('resumePaper');
  const meter = qs('resumePageMeter');
  if (!paper || !meter) return;

  const height = paper.scrollHeight;
  const standardHeight = 960;
  const fitPct = Math.round((height / standardHeight) * 100);

  if (fitPct <= 102) {
    meter.textContent = `📄 1-Page Standard (Fit: ${Math.min(fitPct, 100)}%)`;
    meter.style.color = 'var(--pp-accent-emerald)';
    meter.style.borderColor = 'rgba(16, 185, 129, 0.3)';
    meter.style.background = 'var(--pp-accent-emerald-soft)';
  } else {
    meter.textContent = `⚠️ Overflows 1 Page (${fitPct}% of page height)`;
    meter.style.color = 'var(--pp-accent-rose)';
    meter.style.borderColor = 'rgba(244, 63, 94, 0.3)';
    meter.style.background = 'var(--pp-accent-rose-soft)';
  }
}

function runAtsScan() {
  const jobText = (qs('atsJobDesc')?.value || '').toLowerCase();
  if (!jobText.trim()) {
    if (qs('atsScoreVal')) qs('atsScoreVal').textContent = '0%';
    const gauge = qs('atsGauge');
    if (gauge) gauge.style.setProperty('--gauge-pct', 0);
    if (qs('atsMatchedCount')) qs('atsMatchedCount').textContent = '0';
    if (qs('atsMissingCount')) qs('atsMissingCount').textContent = '0';
    if (qs('atsMatchedChips')) qs('atsMatchedChips').innerHTML = '<span class="muted" style="font-size:12px;">No scan yet</span>';
    if (qs('atsMissingChips')) qs('atsMissingChips').innerHTML = '<span class="muted" style="font-size:12px;">No scan yet</span>';
    return;
  }

  playUiSound('chime');

  const presentInJob = TECH_KEYWORDS.filter(kw => {
    const regex = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
    return regex.test(jobText);
  });

  const targetKeywords = presentInJob.length ? presentInJob : ['react', 'python', 'sql', 'git', 'apis', 'data structures', 'docker'];
  const resume = getResumeState();
  const resumeText = JSON.stringify(resume).toLowerCase();

  const matched = [];
  const missing = [];

  targetKeywords.forEach(kw => {
    if (resumeText.includes(kw.toLowerCase())) matched.push(kw);
    else missing.push(kw);
  });

  const scorePct = Math.round((matched.length / Math.max(targetKeywords.length, 1)) * 100);

  const gauge = qs('atsGauge');
  if (gauge) gauge.style.setProperty('--gauge-pct', scorePct);
  if (qs('atsScoreVal')) qs('atsScoreVal').textContent = `${scorePct}%`;

  const tier = qs('atsScoreTier');
  const desc = qs('atsScoreDesc');
  if (scorePct >= 75) {
    if (tier) tier.textContent = '🎉 Top-Tier ATS Match (Interview Ready)';
    if (desc) desc.textContent = 'Your resume aligns strongly with this role’s core tech stack and requirements.';
  } else if (scorePct >= 50) {
    if (tier) tier.textContent = '⚡ Moderate Match (Elevate Missing Keywords)';
    if (desc) desc.textContent = 'Good baseline, but adding the missing technologies will boost your ranking.';
  } else {
    if (tier) tier.textContent = '⚠️ Low ATS Match (Needs Keyword Optimization)';
    if (desc) desc.textContent = 'Click the missing keyword chips below to integrate them into your technical skills.';
  }

  if (qs('atsMatchedCount')) qs('atsMatchedCount').textContent = matched.length;
  if (qs('atsMissingCount')) qs('atsMissingCount').textContent = missing.length;

  if (qs('atsMatchedChips')) {
    qs('atsMatchedChips').innerHTML = matched.length
      ? matched.map(k => `<span class="ats-chip matched" title="Verified in resume">✓ ${escapeHtml(k)}</span>`).join('')
      : '<span class="muted" style="font-size:12px;">None matched</span>';
  }

  if (qs('atsMissingChips')) {
    qs('atsMissingChips').innerHTML = missing.length
      ? missing.map(k => `<button type="button" class="ats-chip missing" onclick="insertKeywordToResume('${escapeAttr(k)}')" title="Click to insert into skills">＋ ${escapeHtml(k)}</button>`).join('')
      : '<span class="ats-chip matched">✓ All keywords covered!</span>';
  }

  // ATS Checklist Updates
  const wordCount = (resumeText.match(/\b\w+\b/g) || []).length;
  const chkLength = qs('chkLength');
  if (chkLength) {
    if (wordCount >= 250 && wordCount <= 750) {
      chkLength.innerHTML = '✓ 1-Page Standard (' + wordCount + ' words)';
      chkLength.style.color = 'var(--pp-accent-emerald)';
    } else {
      chkLength.innerHTML = '⚠️ Length: ' + wordCount + ' words';
      chkLength.style.color = 'var(--pp-accent-amber)';
    }
  }

  const chkContact = qs('chkContact');
  if (chkContact) {
    const hasContact = resume.personal.fullName && (resume.personal.email || resume.personal.phone);
    chkContact.innerHTML = hasContact ? '✓ Contact Info Complete' : '⚠️ Missing Contact Info';
    chkContact.style.color = hasContact ? 'var(--pp-accent-emerald)' : 'var(--pp-accent-rose)';
  }

  const chkSkills = qs('chkSkills');
  if (chkSkills) {
    const allSkills = [resume.skills.languages, resume.skills.frameworks, resume.skills.tools, resume.skills.concepts].join(' ');
    const hasEnoughSkills = (allSkills.match(/,/g) || []).length >= 4;
    chkSkills.innerHTML = hasEnoughSkills ? '✓ Tech Stack Rich' : '⚠️ Add More Tech Skills';
    chkSkills.style.color = hasEnoughSkills ? 'var(--pp-accent-emerald)' : 'var(--pp-accent-amber)';
  }

  const chkVerbs = qs('chkVerbs');
  if (chkVerbs) {
    const actionRegex = /\b(architected|engineered|optimized|automated|spearheaded|developed|designed|implemented|reduced|scaled)\b/i;
    const hasVerbs = actionRegex.test(resumeText);
    chkVerbs.innerHTML = hasVerbs ? '✓ Action Verbs Strong' : '⚠️ Use Power Verbs';
    chkVerbs.style.color = hasVerbs ? 'var(--pp-accent-emerald)' : 'var(--pp-accent-amber)';
  }

  updateResumePageMeter();
  toast(`ATS Scan Complete: ${scorePct}% Match Score`, 'success');
}

function autoFillResumeFromPathPilot() {
  playUiSound('success');
  const resume = getResumeState();
  const auth = loadAuth() || {};

  if (auth.name) resume.personal.fullName = auth.name;
  if (auth.email && !auth.email.endsWith('@pathpilot.local')) resume.personal.email = auth.email;
  if (state.settings?.profileCollege) resume.education[0].institution = state.settings.profileCollege;
  if (state.settings?.profileGraduationYear) resume.education[0].graduation = 'May ' + state.settings.profileGraduationYear;

  if (state.grades && state.grades.length) {
    const totalCredits = state.grades.reduce((sum, g) => sum + (Number(g.credits) || 3), 0);
    const weightedSum = state.grades.reduce((sum, g) => sum + ((Number(g.score) || 80) / 25) * (Number(g.credits) || 3), 0);
    const gpa = (weightedSum / Math.max(totalCredits, 1)).toFixed(2);
    resume.education[0].gpa = `${gpa} / 4.0`;
  }

  const solvedCount = (store.get('dsa_solved', []) || []).length;
  if (solvedCount > 0) {
    const existingDsaCert = resume.certifications.find(c => c.name.includes('DSA'));
    if (!existingDsaCert) {
      resume.certifications.push({
        id: uid(),
        name: `PathPilot Consensus 75: ${solvedCount}/75 Problems Solved`,
        issuer: 'PathPilot Student OS',
        year: '2026'
      });
    } else {
      existingDsaCert.name = `PathPilot Consensus 75: ${solvedCount}/75 Problems Solved`;
    }
  }

  saveState();
  renderResumeStudio();
  toast('Resume auto-filled with your PathPilot profile data!', 'success');
}

function exportResumeJson() {
  playUiSound('click');
  const resume = getResumeState();
  const auth = loadAuth() || {};
  const name = (auth.name || 'Student').replace(/[^a-zA-Z0-9_-]/g, '_');
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `PathPilot_Resume_${name}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
  toast('Resume JSON exported successfully!', 'success');
}

function importResumeJson(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && typeof parsed === 'object') {
        state.resume = parsed;
        saveState();
        renderResumeStudio();
        renderLiveResumePaper();
        updateResumePageMeter();
        runAtsScan();
        toast('Resume imported successfully from JSON!', 'success');
      } else {
        toast('Invalid JSON resume format.', 'error');
      }
    } catch(err) {
      toast('Failed to parse JSON file.', 'error');
    }
  };
  reader.readAsText(file);
}

// ── Mock Interview Simulator ──
const MOCK_QUESTIONS = [
  {
    id: 'q1',
    category: 'behavioral',
    company: 'Amazon',
    difficulty: 'Medium',
    question: 'Tell me about a time you had a significant technical disagreement with a teammate or lead. How did you resolve it, and what was the outcome?',
    tip: 'Demonstrate Customer Obsession and Have Backbone; Disagree and Commit. Focus on data-driven discussion rather than ego.',
    benchmark: 'In my university capstone project, our backend team was divided between using MongoDB vs PostgreSQL for our e-commerce catalog and ordering service. My peer advocated for MongoDB for schema agility, but I realized our order fulfillment required ACID transactions and complex inventory joins. Rather than arguing opinions, I benchmarked both databases under simulated concurrent checkout spikes of 2,000 transactions and presented latency and transaction rollback graphs. The data showed PostgreSQL maintained 0% data inconsistency with sub-35ms commits. We aligned on PostgreSQL, deployed on schedule, and supported 10,000+ test purchases with zero lost records.',
    strengths: ['Data-driven resolution using benchmarks', 'Focus on ACID guarantees and system reliability', 'Clear quantified metrics'],
    improvements: ['Could elaborate on how you maintained relationship with teammate afterwards']
  },
  {
    id: 'q2',
    category: 'behavioral',
    company: 'Google',
    difficulty: 'Hard',
    question: 'Describe a situation where a critical software feature or bug failed in testing or production. What was your diagnosis, and how did you resolve it?',
    tip: 'Be transparent about what broke, emphasize systematic root-cause analysis (5 Whys), and demonstrate post-mortem prevention mechanisms.',
    benchmark: 'During my internship at TechNova, our staging release failed with intermittent 504 Gateway Timeouts under load. As the on-call intern, I inspected distributed traces in Datadog and isolated the failure to an unindexed foreign-key lookup on our user_sessions table causing thread pool starvation. I created a database migration to introduce a composite B-Tree index, implemented a circuit breaker in Node.js, and backfilled automated k6 load tests in our GitHub Actions pipeline. The fix dropped p99 latency from 1,200ms to 42ms and prevented similar unindexed queries across the engineering team.',
    strengths: ['Effective observability and root-cause tracing', 'Implemented both immediate fix and automated regression testing', 'Strong quantified latency improvement (1,200ms to 42ms)'],
    improvements: ['Specify how you communicated the outage to cross-functional stakeholders']
  },
  {
    id: 'q3',
    category: 'behavioral',
    company: 'Meta',
    difficulty: 'Medium',
    question: 'Tell me about a project where you took ownership outside of your assigned responsibilities to improve engineering quality or developer velocity.',
    tip: 'Highlight initiative, collaboration, and how you quantified the improvement for the broader team.',
    benchmark: 'While building our student club portal, onboarding new contributors took over 3 days due to manual environment setup and differing operating systems. Although my assigned task was solely frontend navigation, I volunteered a weekend to containerize the entire stack with Docker Compose and wrote a one-click initialization script. I documented the setup in a clean README and held an onboarding workshop. This reduced developer setup time from 3 days to under 8 minutes and enabled 14 new students to make their first pull request within their first week.',
    strengths: ['Clear proactive initiative', 'Measurable 3-day to 8-minute time savings', 'Broad team enablement and multiplier effect'],
    improvements: ['Discuss how you gathered feedback from new contributors']
  },
  {
    id: 'q4',
    category: 'behavioral',
    company: 'Stripe',
    difficulty: 'Hard',
    question: 'Tell me about a time you had to deliver a high-stakes technical deliverable under strict regulatory or latency constraints.',
    tip: 'Emphasize rigor, risk management, automated testing, and zero-defect execution.',
    benchmark: 'In building a mock payment processing microservice for our fintech course, we had to ensure idempotent request handling under network packet retries. I implemented a Redis distributed lock paired with an idempotency-key header pattern. If a network blip occurred, subsequent retries with the same UUID returned the cached response rather than duplicate billing. I subjected the endpoint to 5,000 simulated chaotic network drops in Artillery. The service maintained 100% financial state consistency with zero double-charge transactions and sustained sub-40ms response times.',
    strengths: ['Idempotency-key pattern demonstrates industry production knowledge', 'Simulated chaotic network drop testing', 'Clear 100% consistency metric'],
    improvements: ['Mention handling expired idempotency keys and cache evictions']
  },
  {
    id: 'q5',
    category: 'technical',
    company: 'Apple',
    difficulty: 'Medium',
    question: 'Explain the difference between a Process and a Thread, how Context Switching works, and what causes CPU thrashing.',
    tip: 'Cover memory address spaces, PCB/TCB overhead, CPU register restoration, and virtual memory page fault loops.',
    benchmark: 'A Process is an independent executing program with its own dedicated virtual address space (stack, heap, data, text segments) managed by the OS via a Process Control Block (PCB). A Thread is the smallest schedulable unit of execution within a process that shares memory and resources with sibling threads, keeping only its own stack and registers. Context switching between processes incurs higher overhead because the CPU must invalidate the Translation Lookaside Buffer (TLB) and reload page tables, whereas thread context switching within the same process retains the TLB cache. Thrashing occurs when the system spends more time swapping virtual memory pages between RAM and disk than executing user instructions, typically when the total working set of active processes exceeds physical RAM.',
    strengths: ['Accurate virtual memory and TLB distinction', 'Covered PCB vs TCB', 'Clear explanation of page fault thrashing'],
    improvements: ['Mention thread synchronization primitives like mutexes and condition variables']
  },
  {
    id: 'q6',
    category: 'technical',
    company: 'Microsoft',
    difficulty: 'Medium',
    question: 'What is Database Normalization (1NF, 2NF, 3NF, BCNF), and in what scenarios would you intentionally denormalize?',
    tip: 'Define each normal form clearly (atomic values, no partial dependencies, no transitive dependencies), and justify denormalization for read-heavy OLAP systems.',
    benchmark: 'Database Normalization organizes tables to eliminate insertion, update, and deletion anomalies while minimizing data redundancy. 1NF requires atomic attribute values and a unique primary key. 2NF removes partial functional dependencies on composite keys. 3NF ensures no non-key attribute transitively depends on the primary key. BCNF addresses complex overlapping candidate keys. In production systems with read-to-write ratios exceeding 100:1 (like analytics dashboards or product catalogs), strict 3NF causes expensive multi-table joins. We intentionally denormalize by storing pre-computed counts or replicating parent data to achieve O(1) single-table lookups, accepting the trade-off of maintaining cache invalidation.',
    strengths: ['Clear progression through 1NF, 2NF, 3NF', 'Sound justification of read vs write trade-offs'],
    improvements: ['Give an explicit example of a table schema before and after normalization']
  },
  {
    id: 'q7',
    category: 'technical',
    company: 'Uber',
    difficulty: 'Hard',
    question: 'What is the difference between a Mutex, a Semaphore, and a Spinlock? How do you prevent and detect deadlocks in multi-threaded systems?',
    tip: 'Mention Dijkstra 4 Coffman conditions for deadlocks: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
    benchmark: 'A Mutex is a locking mechanism allowing only one thread to access a critical section with ownership (the unlocking thread must be the locking thread). A Counting Semaphore maintains a counter of available permits, allowing N threads concurrent access. A Spinlock busy-waits in a tight loop checking a CPU atomic flag (test-and-set); it is optimal only for very short lock hold times where context-switch overhead exceeds spinning time. Deadlocks require 4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. We prevent deadlocks by enforcing strict global lock ordering (breaking circular wait), utilizing timeout-based try-lock acquisitions, or using lock-free data structures with atomic CAS (Compare-And-Swap) operations.',
    strengths: ['Deep OS primitives understanding', 'Identified Coffman conditions', 'Proposed global lock ordering & CAS atomics'],
    improvements: ['Mention the Banker algorithm for deadlock avoidance']
  },
  {
    id: 'q8',
    category: 'system',
    company: 'Google',
    difficulty: 'Hard',
    question: 'How would you design a distributed URL shortening service like TinyURL (bit.ly)? What are the database schema, encoding scheme, and scalability bottlenecks?',
    tip: 'Calculate read/write QPS, choose between Base62 vs Hash + collision detection, and architect a distributed Redis cache layer.',
    benchmark: 'For a URL shortener handling 100M URLs created per month (~40 writes/sec) and 10B reads per month (~4,000 reads/sec): 1) Storage & Schema: Use a relational DB (PostgreSQL) or distributed NoSQL (Cassandra/DynamoDB) with schema (id: int64, original_url: text, short_key: varchar(7), user_id, created_at). 2) Short Key Encoding: A 7-character Base62 string (62^7 ≈ 3.5 trillion unique URLs). Use a distributed auto-incrementing ID generator (like Twitter Snowflake or ZooKeeper range allocation) and convert the 64-bit integer into Base62 to guarantee zero collisions without retry overhead. 3) Caching & Latency: Place a Redis cluster caching the top 20% most accessed URLs (80/20 Pareto rule) to serve 95% of reads directly from RAM in sub-3ms. 4) Scaling: Front with Cloudflare CDN for geo-distributed 301/302 redirects and horizontally scale stateless API pods behind an NGINX load balancer.',
    strengths: ['Accurate capacity estimation and Base62 math', 'Snowflake ID generation avoids hash collisions', 'Cache sizing and CDN edge caching'],
    improvements: ['Discuss telemetry, rate-limiting per API key, and expired URL garbage collection']
  },
  {
    id: 'q9',
    category: 'system',
    company: 'Netflix',
    difficulty: 'Hard',
    question: 'Design a distributed API Rate Limiter to protect microservices from abusive traffic spikes and DDoS attacks.',
    tip: 'Compare Token Bucket, Leaky Bucket, and Sliding Window Counter. Discuss Redis sorted sets vs Lua scripts.',
    benchmark: 'To rate limit incoming requests across globally distributed microservices (e.g. 10,000 req/min per API key): 1) Algorithm: I recommend the Sliding Window Counter or Token Bucket implemented in Redis. Token Bucket is memory-efficient (stores tokens + last_refill_timestamp per key). 2) Atomic Execution: To avoid race conditions under concurrent requests across API pods, execute the token deduction via an atomic Redis Lua script. 3) Scalability & Failover: Place the rate limiter as a lightweight middleware at the API Gateway layer (Envoy or Kong). If Redis clusters experience network partitions, fail open with localized in-memory token buckets to prevent complete service downtime. Return standard HTTP 429 Too Many Requests with Retry-After and X-RateLimit headers.',
    strengths: ['Identified Redis Lua script for race condition prevention', 'Fail-open resiliency architectural consideration', 'Standard HTTP 429 and Retry-After response headers'],
    improvements: ['Discuss user-tier dynamic quotas (Free vs Pro)']
  }
];

let activeInterviewId = 'q1';
let interviewTimerInterval = null;
let interviewSeconds = 180;
let speechRecognizer = null;
let isRecordingVoice = false;

function renderInterviews() {
  const list = qs('interviewQuestionsList');
  if (!list) return;

  const currentCat = window.__intCatFilter || 'all';
  const searchTerm = (window.__intSearchTerm || '').toLowerCase();

  const filtered = MOCK_QUESTIONS.filter(q => {
    const matchesCat = (currentCat === 'all' || q.category === currentCat);
    const matchesSearch = !searchTerm ||
      q.question.toLowerCase().includes(searchTerm) ||
      q.company.toLowerCase().includes(searchTerm) ||
      q.category.toLowerCase().includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  const allCount = MOCK_QUESTIONS.length;
  const behCount = MOCK_QUESTIONS.filter(x => x.category === 'behavioral').length;
  const techCount = MOCK_QUESTIONS.filter(x => x.category === 'technical').length;
  const sysCount = MOCK_QUESTIONS.filter(x => x.category === 'system').length;

  if (qs('catCountAll')) qs('catCountAll').textContent = allCount;
  if (qs('catCountBeh')) qs('catCountBeh').textContent = behCount;
  if (qs('catCountTech')) qs('catCountTech').textContent = techCount;
  if (qs('catCountSys')) qs('catCountSys').textContent = sysCount;

  list.innerHTML = filtered.length ? filtered.map(q => {
    const isDone = (state.mockInterviews?.solved || []).includes(q.id);
    return `
      <div class="int-q-item ${q.id === activeInterviewId ? 'active' : ''}" onclick="selectInterviewQuestion('${q.id}')">
        <span class="int-q-company">${escapeHtml(q.company)} · ${escapeHtml(q.category.toUpperCase())} · <span style="opacity:0.8;">${escapeHtml(q.difficulty || 'Med')}</span></span>
        <strong>${escapeHtml(q.question)}</strong>
        <span class="int-q-status ${isDone ? 'done' : ''}">${isDone ? '✓ Completed' : '○ Not yet practiced'}</span>
      </div>
    `;
  }).join('') : '<div style="padding:20px;text-align:center;color:var(--pp-text-muted);font-size:13px;">No questions match your search.</div>';

  if (qs('interviewCountSolved')) {
    const solvedCount = (state.mockInterviews?.solved || []).length;
    qs('interviewCountSolved').textContent = `${solvedCount} / ${MOCK_QUESTIONS.length} Completed`;
  }

  loadActiveInterview();
}

window.selectInterviewQuestion = function(id) {
  activeInterviewId = id;
  playUiSound('click');
  renderInterviews();
};

function loadActiveInterview() {
  const q = MOCK_QUESTIONS.find(x => x.id === activeInterviewId) || MOCK_QUESTIONS[0];
  if (!q) return;

  if (qs('intCompanyPill')) qs('intCompanyPill').textContent = q.company;
  if (qs('intCatPill')) qs('intCatPill').textContent = q.category.toUpperCase();
  if (qs('intDiffPill')) qs('intDiffPill').textContent = q.difficulty || 'Medium';
  if (qs('intQuestionText')) qs('intQuestionText').textContent = q.question;
  if (qs('intQuestionTip')) qs('intQuestionTip').textContent = q.tip;

  clearInterval(interviewTimerInterval);
  interviewSeconds = 180;
  updateTimerDisplay();
  if (qs('intTimerToggle')) qs('intTimerToggle').textContent = 'Start';

  if (qs('starSituation')) qs('starSituation').value = '';
  if (qs('starTask')) qs('starTask').value = '';
  if (qs('starAction')) qs('starAction').value = '';
  if (qs('starResult')) qs('starResult').value = '';
  if (qs('intFreeAnswer')) qs('intFreeAnswer').value = '';

  qs('intEvalCard')?.classList.add('hidden');
  qs('intBenchmarkCard')?.classList.add('hidden');
  updateLiveStarMetricsDetector();
}

function updateTimerDisplay() {
  const m = String(Math.floor(interviewSeconds / 60)).padStart(2, '0');
  const s = String(interviewSeconds % 60).padStart(2, '0');
  if (qs('intTimer')) qs('intTimer').textContent = `${m}:${s}`;
}

function toggleInterviewTimer() {
  playUiSound('click');
  const btn = qs('intTimerToggle');
  if (interviewTimerInterval) {
    clearInterval(interviewTimerInterval);
    interviewTimerInterval = null;
    if (btn) btn.textContent = 'Resume';
  } else {
    if (interviewSeconds <= 0) interviewSeconds = 180;
    interviewTimerInterval = setInterval(() => {
      interviewSeconds--;
      updateTimerDisplay();
      if (interviewSeconds <= 0) {
        clearInterval(interviewTimerInterval);
        interviewTimerInterval = null;
        if (btn) btn.textContent = 'Start';
        playUiSound('bell');
        toast('Time is up! Submit your answer for evaluation.', 'info');
      }
    }, 1000);
    if (btn) btn.textContent = 'Pause';
  }
}

function resetInterviewTimer() {
  playUiSound('click');
  clearInterval(interviewTimerInterval);
  interviewTimerInterval = null;
  interviewSeconds = 180;
  updateTimerDisplay();
  if (qs('intTimerToggle')) qs('intTimerToggle').textContent = 'Start';
}

function updateLiveStarMetricsDetector() {
  const sit = qs('starSituation')?.value || '';
  const task = qs('starTask')?.value || '';
  const act = qs('starAction')?.value || '';
  const res = qs('starResult')?.value || '';
  const free = qs('intFreeAnswer')?.value || '';
  const text = (sit + ' ' + task + ' ' + act + ' ' + res + ' ' + free).trim();

  const detector = qs('starMetricsDetector');
  const detText = qs('detText');
  if (!detector || !detText) return;

  const matches = text.match(/\d+%\b|\b\d+\s*ms\b|\b\d+\s*x\b|\$\d+|\b\d+\s*(users|seconds|minutes|hours|days|queries|req\/s|rps)\b/gi) || [];
  const actionVerbs = text.match(/\b(architected|engineered|optimized|automated|spearheaded|developed|designed|implemented|reduced|scaled)\b/gi) || [];

  if (matches.length > 0) {
    detector.classList.add('active');
    detText.innerHTML = `✨ <strong>${matches.length} metric(s) detected (${escapeHtml(matches.slice(0, 3).join(', '))})</strong> and ${actionVerbs.length} power verb(s)! Excellent quantifiable impact!`;
  } else {
    detector.classList.remove('active');
    detText.innerHTML = `💡 Tip: Include quantified metrics (e.g. <em>reduced latency by 45%</em>, <em>handled 10k users</em>) to maximize score.`;
  }
}

function toggleVoiceRecognition() {
  const btn = qs('intVoiceBtn');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    toast('Speech recognition not supported in this browser. Please type your response.', 'info');
    return;
  }

  if (isRecordingVoice) {
    if (speechRecognizer) speechRecognizer.stop();
    isRecordingVoice = false;
    btn?.classList.remove('recording');
    if (btn) btn.textContent = '🎙️ Voice Mode';
    toast('Voice input stopped', 'info');
  } else {
    try {
      speechRecognizer = new SpeechRecognition();
      speechRecognizer.continuous = true;
      speechRecognizer.interimResults = true;
      speechRecognizer.lang = 'en-US';

      speechRecognizer.onstart = () => {
        isRecordingVoice = true;
        btn?.classList.add('recording');
        if (btn) btn.textContent = '🔴 Listening... (Click to stop)';
        toast('Listening! Speak your interview response...', 'info');
      };

      speechRecognizer.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }

        const isStar = !qs('intStarContainer')?.classList.contains('hidden');
        if (isStar) {
          const act = qs('starAction');
          if (act) { act.value += ' ' + transcript; updateLiveStarMetricsDetector(); }
        } else {
          const free = qs('intFreeAnswer');
          if (free) { free.value += ' ' + transcript; updateLiveStarMetricsDetector(); }
        }
      };

      speechRecognizer.onerror = () => {
        isRecordingVoice = false;
        btn?.classList.remove('recording');
        if (btn) btn.textContent = '🎙️ Voice Mode';
      };

      speechRecognizer.onend = () => {
        isRecordingVoice = false;
        btn?.classList.remove('recording');
        if (btn) btn.textContent = '🎙️ Voice Mode';
      };

      speechRecognizer.start();
    } catch(err) {
      toast('Could not start speech recognition', 'error');
    }
  }
}

function evaluateInterviewAnswer() {
  const q = MOCK_QUESTIONS.find(x => x.id === activeInterviewId);
  if (!q) return;

  const sit = qs('starSituation')?.value.trim() || '';
  const task = qs('starTask')?.value.trim() || '';
  const act = qs('starAction')?.value.trim() || '';
  const res = qs('starResult')?.value.trim() || '';
  const free = qs('intFreeAnswer')?.value.trim() || '';

  const fullText = (sit + ' ' + task + ' ' + act + ' ' + res + ' ' + free).trim();
  if (fullText.length < 30) {
    toast('Please write a more detailed response before evaluating.', 'error');
    return;
  }

  playUiSound('success');

  let score = 5.0;
  const hasNumbers = /\d+%|\d+ms|\d+x|\$\d+|\d+\s*(users|seconds|minutes|hours|days|percent)/i.test(fullText);
  const hasAction = /\b(i|my|engineered|architected|implemented|optimized|diagnosed|resolved|built|designed|automated)\b/i.test(fullText);
  const wordCount = fullText.split(/\s+/).length;

  let starScore = 70;
  if (sit.length > 20) { score += 1.0; starScore += 8; }
  if (task.length > 20) { score += 1.0; starScore += 7; }
  if (act.length > 40) { score += 1.5; starScore += 10; }
  if (res.length > 20) { score += 1.0; starScore += 5; }

  let metricScore = hasNumbers ? 88 : 55;
  if (hasNumbers) score += 1.5;

  let ownershipScore = hasAction ? 92 : 65;
  if (hasAction) score += 0.8;

  let depthScore = wordCount > 90 ? 90 : 68;
  if (wordCount > 100) score += 0.7;

  score = Math.min(9.8, Math.max(6.2, Number(score.toFixed(1))));

  const evalCard = qs('intEvalCard');
  if (evalCard) {
    evalCard.classList.remove('hidden');
    if (qs('intEvalScore')) qs('intEvalScore').textContent = score;

    if (qs('barStar')) qs('barStar').style.width = `${Math.min(starScore, 100)}%`;
    if (qs('barStarVal')) qs('barStarVal').textContent = `${Math.min(starScore, 100)}%`;

    if (qs('barMetrics')) qs('barMetrics').style.width = `${metricScore}%`;
    if (qs('barMetricsVal')) qs('barMetricsVal').textContent = `${metricScore}%`;

    if (qs('barOwnership')) qs('barOwnership').style.width = `${ownershipScore}%`;
    if (qs('barOwnershipVal')) qs('barOwnershipVal').textContent = `${ownershipScore}%`;

    if (qs('barDepth')) qs('barDepth').style.width = `${depthScore}%`;
    if (qs('barDepthVal')) qs('barDepthVal').textContent = `${depthScore}%`;

    const strengthsEl = qs('intEvalStrengths');
    if (strengthsEl) {
      const strengths = [...(q.strengths || ['Clear structural organization', 'Direct alignment with interviewer prompt'])];
      if (hasNumbers) strengths.push('Excellent use of quantified impact metrics');
      if (hasAction) strengths.push('Strong personal ownership ("I engineered, I optimized")');
      strengthsEl.innerHTML = strengths.map(s => `<li>${escapeHtml(s)}</li>`).join('');
    }

    const impEl = qs('intEvalImprovements');
    if (impEl) {
      const imps = [...(q.improvements || [])];
      if (!hasNumbers) imps.push('Include more concrete quantitative results (e.g. latency reduced by X%, team saved Y hours).');
      if (wordCount < 80) imps.push('Expand on the technical constraints and trade-offs considered.');
      impEl.innerHTML = imps.map(i => `<li>${escapeHtml(i)}</li>`).join('');
    }
  }

  if (!state.mockInterviews) state.mockInterviews = { solved: [], history: [] };
  if (!state.mockInterviews.solved.includes(q.id)) {
    state.mockInterviews.solved.push(q.id);
  }
  state.mockInterviews.history.unshift({ id: q.id, date: Date.now(), score });
  saveState();
  renderInterviews();

  toast(`Interview Evaluated! Score: ${score}/10`, 'success');
}

function showBenchmarkAnswer() {
  const q = MOCK_QUESTIONS.find(x => x.id === activeInterviewId);
  if (!q) return;
  playUiSound('chime');
  const card = qs('intBenchmarkCard');
  if (card) {
    card.classList.remove('hidden');
    if (qs('intBenchmarkText')) {
      qs('intBenchmarkText').innerHTML = `
        <div style="margin-bottom:12px;padding:10px 14px;border-radius:10px;background:var(--pp-brand-gradient-subtle);border:1px solid rgba(59,102,245,0.2);font-size:12px;color:var(--pp-brand-primary);">
          <strong>Staff Engineer Caliber Answer Breakdown:</strong> Note the immediate problem setup, concrete trade-off evaluation, and quantified production results.
        </div>
        <p style="font-size:13.5px;line-height:1.75;color:var(--pp-text-main);">${escapeHtml(q.benchmark)}</p>
      `;
    }
  }
}

// ── Public Student Portfolio Studio ──
function getPortfolioState() {
  if (!state.portfolio) {
    state.portfolio = {
      headline: 'Aspiring Software Engineer & Computer Science Student',
      bio: 'Passionate about building scalable distributed backends, mastering data structures & algorithms, and designing clean, high-performance web user experiences.',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      showStats: true,
      showProjects: true,
      showSkills: true,
      showContact: true
    };
    saveState();
  }
  return state.portfolio;
}

function renderPortfolioStudio() {
  const pf = getPortfolioState();
  const resume = getResumeState();
  const auth = loadAuth() || {};

  if (qs('pfHeadline')) qs('pfHeadline').value = pf.headline || '';
  if (qs('pfBio')) qs('pfBio').value = pf.bio || '';
  if (qs('pfGithub')) qs('pfGithub').value = pf.github || '';
  if (qs('pfLinkedin')) qs('pfLinkedin').value = pf.linkedin || '';

  const studentName = resume.personal.fullName || auth.name || 'Alex Rivera';
  const slugName = studentName.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (qs('pfSlugPreview')) qs('pfSlugPreview').textContent = slugName;

  const canvas = qs('portfolioLiveCanvas');
  if (!canvas) return;

  const solvedCount = (store.get('dsa_solved', []) || []).length;
  const pct = Math.round((solvedCount / 75) * 100);
  const totalFocusMin = (state.focusSessions || []).reduce((sum, s) => sum + Math.round((s.mode || 1500) / 60), 0);
  const focusHours = (totalFocusMin / 60).toFixed(1);

  let gpa = '3.85';
  if (state.grades && state.grades.length) {
    const totalCredits = state.grades.reduce((sum, g) => sum + (Number(g.credits) || 3), 0);
    const weightedSum = state.grades.reduce((sum, g) => sum + ((Number(g.score) || 80) / 25) * (Number(g.credits) || 3), 0);
    gpa = (weightedSum / Math.max(totalCredits, 1)).toFixed(2);
  }

  canvas.innerHTML = `
    <div class="pf-hero">
      <div class="pf-badge">✦ Verified PathPilot Student Profile</div>
      <div class="pf-avatar">${escapeHtml(studentName.charAt(0))}</div>
      <h1>${escapeHtml(studentName)}</h1>
      <div class="pf-tagline">${escapeHtml(pf.headline)}</div>
      <p class="pf-bio">${escapeHtml(pf.bio)}</p>
    </div>

    ${pf.showStats !== false ? `
      <div class="pf-stats-grid">
        <div class="pf-stat-card"><strong>${solvedCount} / 75</strong><span>Blind 75 DSA (${pct}%)</span></div>
        <div class="pf-stat-card"><strong>${gpa}</strong><span>Cumulative GPA / 4.0</span></div>
        <div class="pf-stat-card"><strong>${focusHours}h</strong><span>Deep Focus Logged</span></div>
        <div class="pf-stat-card"><strong>${(state.tasks || []).filter(t => t.done).length}</strong><span>Milestones Completed</span></div>
      </div>
    ` : ''}

    ${(pf.showProjects !== false && resume.projects && resume.projects.length) ? `
      <div class="pf-section-title">Featured Projects</div>
      <div class="pf-projects-grid">
        ${resume.projects.map(p => `
          <div class="pf-proj-card">
            <h3>${escapeHtml(p.name)}</h3>
            <p>${escapeHtml((p.bullets && p.bullets[0]) || 'Full stack software application with resilient architecture.')}</p>
            <div class="pf-tags">
              ${(p.tech || 'JavaScript, HTML5, CSS3').split(',').map(t => `<span class="pf-tag">${escapeHtml(t.trim())}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${(pf.showSkills !== false && resume.skills) ? `
      <div class="pf-section-title">Technical Competencies</div>
      <div class="pf-skills-cloud">
        ${(resume.skills.languages + ', ' + resume.skills.frameworks + ', ' + resume.skills.tools).split(',').filter(Boolean).map(s => `
          <span class="pf-skill-pill">${escapeHtml(s.trim())}</span>
        `).join('')}
      </div>
    ` : ''}

    ${pf.showContact !== false ? `
      <div class="pf-contact-bar">
        ${pf.github ? `<a class="btn ghost small" href="${escapeAttr(pf.github)}" target="_blank">GitHub</a>` : ''}
        ${pf.linkedin ? `<a class="btn ghost small" href="${escapeAttr(pf.linkedin)}" target="_blank">LinkedIn</a>` : ''}
        <a class="btn primary small" href="mailto:${escapeAttr(resume.personal.email || 'alex@example.edu')}">Contact Me</a>
      </div>
    ` : ''}
  `;
}

function exportPortfolioHtml() {
  playUiSound('success');
  const pf = getPortfolioState();
  const resume = getResumeState();
  const auth = loadAuth() || {};
  const studentName = resume.personal.fullName || auth.name || 'Student';

  const previewContent = qs('portfolioLiveCanvas')?.innerHTML || '';

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(studentName)} — Software Engineer Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  :root { --primary: #2563eb; --text: #0f172a; --muted: #64748b; --border: #e2e8f0; }
  body { font-family: 'Inter', system-ui, sans-serif; background: radial-gradient(circle at top right,#eef2ff,transparent 60%),#f8fafc; color: var(--text); margin: 0; padding: 40px 20px; line-height: 1.5; }
  .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 24px; box-shadow: 0 15px 40px rgba(15,23,42,0.06); border: 1px solid var(--border); }
  .pf-hero { text-align: center; max-width: 580px; margin: 0 auto 36px; }
  .pf-badge { display: inline-flex; background: #dbeafe; color: #1e40af; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 999px; margin-bottom: 14px; }
  .pf-avatar { width: 84px; height: 84px; border-radius: 26px; background: linear-gradient(135deg,#3b82f6,#7c3aed); color: #fff; font-size: 32px; font-weight: 900; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 14px 28px rgba(37,99,235,0.28); }
  .pf-hero h1 { font-size: 32px; margin: 0 0 8px; letter-spacing: -0.03em; }
  .pf-tagline { color: var(--primary); font-weight: 700; font-size: 15px; margin-bottom: 10px; }
  .pf-bio { font-size: 14px; color: var(--muted); line-height: 1.6; }
  .pf-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 14px; margin-bottom: 36px; }
  .pf-stat-card { background: #f8fafc; border: 1px solid var(--border); border-radius: 16px; padding: 18px; text-align: center; }
  .pf-stat-card strong { display: block; font-size: 22px; font-weight: 900; color: #0f172a; margin-bottom: 4px; }
  .pf-stat-card span { font-size: 12px; color: var(--muted); font-weight: 600; }
  .pf-section-title { font-size: 18px; font-weight: 800; margin: 0 0 16px; letter-spacing: -0.02em; }
  .pf-projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 36px; }
  .pf-proj-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 20px; box-shadow: 0 8px 18px rgba(0,0,0,0.03); }
  .pf-proj-card h3 { margin: 0 0 8px; font-size: 16px; }
  .pf-proj-card p { font-size: 13px; color: var(--muted); line-height: 1.5; margin-bottom: 14px; }
  .pf-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .pf-tag { font-size: 11px; font-weight: 700; background: #f1f5f9; color: #334155; padding: 4px 10px; border-radius: 999px; }
  .pf-skills-cloud { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 36px; }
  .pf-skill-pill { background: #eff6ff; color: #1e40af; font-size: 12px; font-weight: 700; padding: 7px 14px; border-radius: 999px; border: 1px solid #bfdbfe; }
  .pf-contact-bar { display: flex; justify-content: center; gap: 14px; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border); }
  .btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 18px; border-radius: 12px; font-size: 13px; font-weight: 700; text-decoration: none; cursor: pointer; transition: transform 0.15s ease; }
  .btn:hover { transform: translateY(-1px); }
  .btn.primary { background: var(--primary); color: #fff; }
  .btn.ghost { background: #f8fafc; border: 1px solid var(--border); color: #334155; }
</style>
</head>
<body>
<div class="container">
  ${previewContent}
</div>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${studentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast('Portfolio file downloaded! Ready to publish on GitHub Pages.', 'success');
}

// ── Interactive DSA Code Runner & Sandbox ──
const DSA_TEST_SUITES = {
  1: {
    fnName: 'maxProfit',
    starter: `/**\n * @param {number[]} prices\n * @return {number}\n */\nfunction maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (let p of prices) {\n    if (p < minPrice) minPrice = p;\n    else if (p - minPrice > maxProfit) maxProfit = p - minPrice;\n  }\n  return maxProfit;\n}`,
    desc: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'In this case, no transactions are done and max profit = 0.' }
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    tests: [
      { args: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { args: [[7, 6, 4, 3, 1]], expected: 0 },
      { args: [[2, 4, 1]], expected: 2 }
    ],
    hint: 'Track the minimum price seen so far as you iterate through the array. At each step, calculate the difference between the current price and minimum price.'
  },
  5: {
    fnName: 'twoSum',
    starter: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
    desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' }
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Exactly one valid answer exists.'],
    tests: [
      { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { args: [[3, 2, 4], 6], expected: [1, 2] },
      { args: [[3, 3], 6], expected: [0, 1] }
    ],
    hint: 'Use a Hash Map to store each element and its index. For each number, check if target - number is already in the map (O(n) time).'
  },
  10: {
    fnName: 'maxSubArray',
    starter: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n  let curSum = nums[0];\n  let maxSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    curSum = Math.max(nums[i], curSum + nums[i]);\n    maxSum = Math.max(maxSum, curSum);\n  }\n  return maxSum;\n}`,
    desc: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    tests: [
      { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { args: [[1]], expected: 1 },
      { args: [[5, 4, -1, 7, 8]], expected: 23 }
    ],
    hint: 'Kadane’s Algorithm: Iterate through the array maintaining the maximum sum ending at current index. If current sum drops below the current element, restart the subarray.'
  },
  65: {
    fnName: 'isValid',
    starter: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (let ch of s) {\n    if (ch === '(' || ch === '{' || ch === '[') {\n      stack.push(ch);\n    } else {\n      if (!stack.length || stack.pop() !== map[ch]) return false;\n    }\n  }\n  return stack.length === 0;\n}`,
    desc: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only \'()[]{}\''],
    tests: [
      { args: ['()'], expected: true },
      { args: ['()[]{}'], expected: true },
      { args: ['(]'], expected: false }
    ],
    hint: 'Push opening brackets onto a stack. When encountering a closing bracket, pop the top element and verify it matches.'
  },
  38: {
    fnName: 'climbStairs',
    starter: `/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) {\n    let c = a + b;\n    a = b;\n    b = c;\n  }\n  return b;\n}`,
    desc: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1 step + 1 step, or 2 steps.' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1.' }
    ],
    constraints: ['1 <= n <= 45'],
    tests: [
      { args: [2], expected: 2 },
      { args: [3], expected: 3 },
      { args: [5], expected: 8 }
    ],
    hint: 'To reach step n, you must arrive from step n-1 or n-2. Thus ways(n) = ways(n-1) + ways(n-2), identical to the Fibonacci sequence.'
  },
  14: {
    fnName: 'search',
    starter: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
    desc: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums in O(log n) runtime.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 10^4', 'nums is sorted in ascending order'],
    tests: [
      { args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 }
    ],
    hint: 'Maintain two pointers left and right. Repeatedly compare target with the middle element and discard the half that cannot contain target.'
  }
};

let activeDsaProblemId = 5;

window.openDsaRunner = function(problemId) {
  playUiSound('click');
  activeDsaProblemId = Number(problemId) || 5;
  const p = (typeof PROBLEMS !== 'undefined' ? PROBLEMS : []).find(x => x.id === activeDsaProblemId) || { id: 5, name: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', url: 'https://leetcode.com/problems/two-sum/' };
  const suite = DSA_TEST_SUITES[activeDsaProblemId] || {
    fnName: 'solution',
    starter: `/**\n * Solution for: ${p.name}\n */\nfunction solution(input) {\n  // Write optimal ${p.topic} solution here\n  return input;\n}`,
    desc: `Solve ${p.name} from the consensus Blind 75 sheet. Focus on achieving optimal time and space complexity for ${p.topic}.`,
    examples: [{ input: 'Standard test input', output: 'Expected result' }],
    constraints: ['Refer to official LeetCode problem specification'],
    tests: [{ args: ['test'], expected: 'test' }],
    hint: `Review fundamental patterns for ${p.topic}: two-pointers, sliding window, topological sort, or dynamic programming memoization.`
  };

  const modal = qs('dsaRunnerModal');
  if (!modal) return;
  modal.classList.remove('hidden');

  if (qs('runnerTitle')) qs('runnerTitle').textContent = p.name;
  if (qs('runnerTopic')) qs('runnerTopic').textContent = p.topic;
  if (qs('runnerDiff')) {
    qs('runnerDiff').textContent = p.difficulty;
    qs('runnerDiff').className = `dsa-runner-badge ${p.difficulty.toLowerCase()}`;
  }
  if (qs('runnerLeetcodeLink')) qs('runnerLeetcodeLink').href = p.url;
  if (qs('runnerDesc')) qs('runnerDesc').textContent = suite.desc;

  if (qs('runnerExamples')) {
    qs('runnerExamples').innerHTML = (suite.examples || []).map(ex => `
      <div class="runner-ex-card">
        <div><strong>Input:</strong> ${escapeHtml(ex.input)}</div>
        <div><strong>Output:</strong> ${escapeHtml(ex.output)}</div>
        ${ex.explanation ? `<div style="color:#94a3b8;font-size:11.5px;margin-top:2px;">${escapeHtml(ex.explanation)}</div>` : ''}
      </div>
    `).join('');
  }

  if (qs('runnerConstraints')) {
    qs('runnerConstraints').innerHTML = (suite.constraints || []).map(c => `<li>${escapeHtml(c)}</li>`).join('');
  }

  if (qs('runnerHintContent')) {
    qs('runnerHintContent').innerHTML = `<p>${escapeHtml(suite.hint)}</p>`;
    qs('runnerHintContent').classList.add('hidden');
  }

  const savedCode = store.get(`dsa_code_${p.id}`, null);
  if (qs('runnerCodeEditor')) {
    qs('runnerCodeEditor').value = savedCode || suite.starter;
  }

  if (qs('runnerStatus')) qs('runnerStatus').textContent = 'Ready to execute';
  if (qs('runnerResultsBox')) qs('runnerResultsBox').innerHTML = '<div class="runner-results-empty">Click "Run Test Cases" to compile and execute your solution.</div>';
};

window.closeDsaRunner = function() {
  playUiSound('click');
  qs('dsaRunnerModal')?.classList.add('hidden');
};

function runDsaCode() {
  const p = (typeof PROBLEMS !== 'undefined' ? PROBLEMS : []).find(x => x.id === activeDsaProblemId);
  const suite = DSA_TEST_SUITES[activeDsaProblemId];
  const code = qs('runnerCodeEditor')?.value || '';

  if (p) store.set(`dsa_code_${p.id}`, code);

  const resultsBox = qs('runnerResultsBox');
  const statusEl = qs('runnerStatus');
  if (!resultsBox) return;

  if (!suite || !suite.tests) {
    resultsBox.innerHTML = `<div class="testcase-card pass">✓ Syntax Compiled Successfully.<br>Compare against LeetCode test suite.</div>`;
    playUiSound('success');
    return;
  }

  let fn;
  try {
    const wrapper = new Function(`${code}\nreturn typeof ${suite.fnName} !== 'undefined' ? ${suite.fnName} : null;`);
    fn = wrapper();
    if (!fn) throw new Error(`Function "${suite.fnName}" was not found in your code.`);
  } catch (err) {
    statusEl.textContent = 'Compilation Error';
    resultsBox.innerHTML = `<div class="testcase-card fail">⚠️ Compilation Error:<br>${escapeHtml(err.message)}</div>`;
    playUiSound('click');
    return;
  }

  let allPassed = true;
  const resultCards = [];

  const t0 = performance.now();
  suite.tests.forEach((t, idx) => {
    try {
      const actual = fn(...clone(t.args));
      const actualStr = JSON.stringify(actual);
      const expectedStr = JSON.stringify(t.expected);
      const passed = actualStr === expectedStr;

      if (!passed) allPassed = false;
      resultCards.push(`
        <div class="testcase-card ${passed ? 'pass' : 'fail'}">
          <div><strong>Case ${idx + 1}:</strong> ${passed ? 'PASSED ✓' : 'FAILED ✗'}</div>
          <div>Input: <code>${escapeHtml(JSON.stringify(t.args))}</code></div>
          <div>Expected: <code>${escapeHtml(expectedStr)}</code> | Actual: <code>${escapeHtml(actualStr)}</code></div>
        </div>
      `);
    } catch (runErr) {
      allPassed = false;
      resultCards.push(`
        <div class="testcase-card fail">
          <div><strong>Case ${idx + 1}:</strong> RUNTIME ERROR ✗</div>
          <div>${escapeHtml(runErr.message)}</div>
        </div>
      `);
    }
  });

  const durationMs = (performance.now() - t0).toFixed(2);
  resultsBox.innerHTML = resultCards.join('');

  if (allPassed) {
    statusEl.innerHTML = `<span style="color:#10b981;font-weight:800;">✓ All ${suite.tests.length} Test Cases Passed (${durationMs}ms)</span>`;
    playUiSound('success');
    if (p && typeof isSolved === 'function' && !isSolved(p.id)) {
      toggleSolved(p.id);
    }
    toast(`🎉 Problem ${p ? p.name : ''} Solved! Checkbox updated automatically.`, 'success');
  } else {
    statusEl.innerHTML = `<span style="color:#ef4444;font-weight:800;">✗ Tests Failed (${durationMs}ms)</span>`;
  }
}

// ── Internship Outreach & Cold Email Generator ──
let currentOutreachIntern = null;

function openOutreachModal(internId) {
  playUiSound('click');
  currentOutreachIntern = (state.internships || []).find(i => i.id === internId) || {
    company: 'Target Company',
    role: 'Software Engineer Intern'
  };

  const modal = qs('internOutreachModal');
  if (modal) modal.classList.remove('hidden');

  renderOutreachTemplate(window.__outreachTab || 'recruiter');
}

function renderOutreachTemplate(type = 'recruiter') {
  window.__outreachTab = type;
  document.querySelectorAll('.outreach-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.type === type));

  const auth = loadAuth() || {};
  const resume = getResumeState();
  const studentName = resume.personal.fullName || auth.name || 'Candidate';
  const college = state.settings?.profileCollege || 'University';
  const company = currentOutreachIntern?.company || 'Company';
  const role = currentOutreachIntern?.role || 'Software Engineer Intern';

  let subject = '';
  let body = '';

  if (type === 'recruiter') {
    subject = `${role} Application — ${studentName} (${college} CS Undergrad)`;
    body = `Hi [Recruiter Name],

I hope this note finds you well. I recently applied for the ${role} position at ${company} and wanted to personally introduce myself.

I am a Computer Science student at ${college} with strong hands-on experience in full-stack web engineering, data structures, and distributed systems. Recently, I built PathPilot (an offline-first productivity platform with sub-40ms execution) and solved over 50+ consensus DSA problems.

Given ${company}'s focus on engineering excellence and innovation, I would love the opportunity to contribute to your engineering team this upcoming term.

My resume and GitHub are linked below for your review. Thank you so much for your time and consideration!

Best regards,
${studentName}
LinkedIn: ${resume.personal.linkedin || 'linkedin.com/in/profile'}
Portfolio: ${resume.personal.portfolio || 'portfolio-link'}`;
  } else if (type === 'alumni') {
    subject = `Fellow ${college} alum reaching out regarding ${company} ${role}`;
    body = `Hi [Alum Name],

I noticed we both attended ${college}! I am currently in my third year studying Computer Science and have been closely following ${company}’s work in engineering.

I am preparing to apply for the ${role} role and would love to ask you a couple of brief questions about your experience transitioning from ${college} to ${company}, and any advice you might have for candidates.

I would be deeply grateful for a quick 10-minute chat or any insights you'd be open to sharing.

Best regards,
${studentName}`;
  } else if (type === 'manager') {
    subject = `Quick question regarding ${company} engineering & ${role}`;
    body = `Hi [Manager Name],

I came across your profile while researching the engineering team at ${company} and was really impressed by your team’s recent milestones.

I am an incoming ${role} applicant with strong proficiency in TypeScript, Python, and scalable backend architecture. I built several production-tested projects including an in-browser code runner and distributed messaging engine.

I would love to learn more about the technical challenges your team is tackling this quarter and see if my skill set would be a strong match.

Best,
${studentName}`;
  } else if (type === 'thankyou') {
    subject = `Thank you — ${role} Interview follow-up (${studentName})`;
    body = `Hi [Interviewer Name],

Thank you so much for taking the time to speak with me today about the ${role} position at ${company}.

I truly enjoyed our discussion regarding [mention specific technical topic, e.g. system scalability and database optimization]. Our conversation reinforced my excitement about the opportunity to join ${company} and contribute to high-impact software.

Please let me know if you need any additional materials or code samples from my end.

Best regards,
${studentName}`;
  }

  if (qs('outreachSubject')) qs('outreachSubject').value = subject;
  if (qs('outreachBody')) qs('outreachBody').value = body;
}

// ── Shortcuts Modal ──
function openShortcutsModal() {
  playUiSound('click');
  qs('ppShortcutsModal')?.classList.remove('hidden');
}

function closeShortcutsModal() {
  playUiSound('click');
  qs('ppShortcutsModal')?.classList.add('hidden');
}

// ── Spaced Repetition (SM-2) Flashcard Handler ──
function rateCurrentFlashcard(grade = 3) {
  playUiSound('success');
  const cards = state.flashcards.filter(f => f.deck === state.ui.selectedDeck);
  if (!cards.length) return;

  const card = cards[state.ui.flashIndex];
  if (!card) return;

  let ef = card.easeFactor || 2.5;
  let rep = card.repetition || 0;
  let interval = card.interval || 1;

  if (grade >= 2) {
    if (rep === 0) interval = 1;
    else if (rep === 1) interval = 3;
    else interval = Math.round(interval * ef);
    rep++;
  } else {
    rep = 0;
    interval = 1;
  }

  ef = ef + (0.1 - (4 - grade) * (0.08 + (4 - grade) * 0.02));
  if (ef < 1.3) ef = 1.3;

  card.easeFactor = Number(ef.toFixed(2));
  card.repetition = rep;
  card.interval = interval;
  card.nextReviewDate = Date.now() + interval * 86400000;

  saveState();

  state.ui.flashIndex = (state.ui.flashIndex + 1) % cards.length;
  state.ui.flashFlipped = false;
  renderFlashcards();
  toast(`Card rated! Next review in ${interval} day${interval === 1 ? '' : 's'}.`, 'success');
}

function bindNewModuleEvents() {
  qs('globalShortcutsBtn')?.addEventListener('click', openShortcutsModal);
  qs('closeShortcutsModal')?.addEventListener('click', closeShortcutsModal);

  qs('resumeAutoFillBtn')?.addEventListener('click', autoFillResumeFromPathPilot);
  qs('resumePrintBtn')?.addEventListener('click', () => { playUiSound('click'); window.print(); });
  qs('toggleAtsPanelBtn')?.addEventListener('click', () => {
    qs('resumeAtsBody')?.classList.toggle('hidden');
  });
  qs('runAtsScanBtn')?.addEventListener('click', runAtsScan);
  qs('loadSampleJobBtn')?.addEventListener('click', () => {
    if (qs('atsJobDesc')) qs('atsJobDesc').value = sampleSweJobDesc;
    runAtsScan();
  });
  qs('pasteJobDescBtn')?.addEventListener('click', async () => {
    playUiSound('click');
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          if (qs('atsJobDesc')) qs('atsJobDesc').value = text;
          runAtsScan();
          toast('Pasted job description from clipboard!', 'success');
          return;
        }
      }
    } catch(err) {}
    const manual = prompt('Paste your target Job Description text below:');
    if (manual) {
      if (qs('atsJobDesc')) qs('atsJobDesc').value = manual;
      runAtsScan();
      toast('Job description updated!', 'success');
    }
  });
  qs('clearJobDescBtn')?.addEventListener('click', () => {
    playUiSound('click');
    if (qs('atsJobDesc')) qs('atsJobDesc').value = '';
    runAtsScan();
    toast('Job description cleared', 'info');
  });
  qs('resumeExportJsonBtn')?.addEventListener('click', exportResumeJson);
  qs('resumeImportJsonBtn')?.addEventListener('click', () => {
    qs('resumeFileInput')?.click();
  });
  qs('resumeFileInput')?.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) importResumeJson(file);
    e.target.value = '';
  });

  document.querySelectorAll('.resume-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      playUiSound('click');
      document.querySelectorAll('.resume-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.resume-tab-content').forEach(c => c.classList.add('hidden'));
      tab.classList.add('active');
      const target = 'resumeTab' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1);
      qs(target)?.classList.remove('hidden');
    });
  });

  document.querySelectorAll('.res-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      document.querySelectorAll('.res-theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const resume = getResumeState();
      resume.theme = btn.dataset.theme;
      saveState();
      renderLiveResumePaper();
    });
  });

  document.querySelectorAll('.verb-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      playUiSound('click');
      const verb = chip.textContent;
      toast(`Action verb "${verb}" copied!`, 'info');
      navigator.clipboard?.writeText(verb);
    });
  });

  qs('addEduBtn')?.addEventListener('click', () => {
    const resume = getResumeState();
    resume.education.push({ id: uid(), institution: 'New University', degree: 'Degree', location: '', graduation: '', gpa: '', courses: '' });
    saveState();
    renderResumeStudio();
    playUiSound('click');
  });

  qs('addExpBtn')?.addEventListener('click', () => {
    const resume = getResumeState();
    resume.experience.push({ id: uid(), company: 'Company Name', role: 'Role Title', location: '', startDate: '', endDate: '', bullets: ['Engineered...'] });
    saveState();
    renderResumeStudio();
    playUiSound('click');
  });

  qs('addProjBtn')?.addEventListener('click', () => {
    const resume = getResumeState();
    resume.projects.push({ id: uid(), name: 'Project Title', tech: 'Tech Stack', link: '', github: '', bullets: ['Developed...'] });
    saveState();
    renderResumeStudio();
    playUiSound('click');
  });

  qs('addCertBtn')?.addEventListener('click', () => {
    const resume = getResumeState();
    resume.certifications.push({ id: uid(), name: 'Certification Name', issuer: 'Issuer', year: '2026' });
    saveState();
    renderResumeStudio();
    playUiSound('click');
  });

  ['resName', 'resEmail', 'resPhone', 'resLocation', 'resLinkedin', 'resGithub', 'resPortfolio', 'resSummary'].forEach(id => {
    qs(id)?.addEventListener('input', e => {
      const resume = getResumeState();
      const field = id.replace('res', '').charAt(0).toLowerCase() + id.replace('res', '').slice(1);
      if (id === 'resName') resume.personal.fullName = e.target.value;
      else resume.personal[field] = e.target.value;
      saveState();
      renderLiveResumePaper();
    });
  });

  ['resSkillLanguages', 'resSkillFrameworks', 'resSkillTools', 'resSkillConcepts'].forEach(id => {
    qs(id)?.addEventListener('input', e => {
      const resume = getResumeState();
      const field = id.replace('resSkill', '').toLowerCase();
      resume.skills[field] = e.target.value;
      saveState();
      renderLiveResumePaper();
    });
  });

  document.querySelectorAll('.int-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      document.querySelectorAll('.int-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.__intCatFilter = btn.dataset.cat;
      renderInterviews();
    });
  });

  qs('intTimerToggle')?.addEventListener('click', toggleInterviewTimer);
  qs('intTimerReset')?.addEventListener('click', resetInterviewTimer);
  qs('intModeStar')?.addEventListener('click', () => {
    playUiSound('click');
    qs('intModeStar').classList.add('active');
    qs('intModeFree')?.classList.remove('active');
    qs('intStarContainer')?.classList.remove('hidden');
    qs('intFreeContainer')?.classList.add('hidden');
  });
  qs('intModeFree')?.addEventListener('click', () => {
    playUiSound('click');
    qs('intModeFree').classList.add('active');
    qs('intModeStar')?.classList.remove('active');
    qs('intFreeContainer')?.classList.remove('hidden');
    qs('intStarContainer')?.classList.add('hidden');
  });
  qs('intSubmitBtn')?.addEventListener('click', evaluateInterviewAnswer);
  qs('intSampleAnswerBtn')?.addEventListener('click', showBenchmarkAnswer);
  qs('intCloseBm')?.addEventListener('click', () => qs('intBenchmarkCard')?.classList.add('hidden'));

  qs('intSearchInput')?.addEventListener('input', (e) => {
    window.__intSearchTerm = e.target.value;
    renderInterviews();
  });
  qs('intVoiceBtn')?.addEventListener('click', toggleVoiceRecognition);

  ['starSituation', 'starTask', 'starAction', 'starResult', 'intFreeAnswer'].forEach(id => {
    qs(id)?.addEventListener('input', updateLiveStarMetricsDetector);
  });

  qs('portfolioCopyHtmlBtn')?.addEventListener('click', () => {
    playUiSound('click');
    const canvas = qs('portfolioLiveCanvas');
    if (canvas) {
      navigator.clipboard?.writeText(canvas.innerHTML);
      toast('Portfolio HTML markup copied to clipboard!', 'success');
    }
  });
  qs('portfolioDownloadBtn')?.addEventListener('click', exportPortfolioHtml);
  qs('pfRefreshPreviewBtn')?.addEventListener('click', () => {
    playUiSound('click');
    const pf = getPortfolioState();
    pf.headline = qs('pfHeadline')?.value || pf.headline;
    pf.bio = qs('pfBio')?.value || pf.bio;
    pf.github = qs('pfGithub')?.value || pf.github;
    pf.linkedin = qs('pfLinkedin')?.value || pf.linkedin;
    pf.showStats = qs('pfShowStats')?.checked ?? true;
    pf.showProjects = qs('pfShowProjects')?.checked ?? true;
    pf.showSkills = qs('pfShowSkills')?.checked ?? true;
    pf.showContact = qs('pfShowContact')?.checked ?? true;
    saveState();
    renderPortfolioStudio();
    toast('Portfolio preview updated!', 'success');
  });

  qs('runnerCloseBtn')?.addEventListener('click', closeDsaRunner);
  qs('runnerResetCodeBtn')?.addEventListener('click', () => {
    playUiSound('click');
    const suite = DSA_TEST_SUITES[activeDsaProblemId];
    if (suite && qs('runnerCodeEditor')) {
      qs('runnerCodeEditor').value = suite.starter;
      toast('Starter template restored', 'info');
    }
  });
  qs('runnerHintToggle')?.addEventListener('click', () => {
    playUiSound('click');
    qs('runnerHintContent')?.classList.toggle('hidden');
  });
  qs('runnerExecuteBtn')?.addEventListener('click', runDsaCode);
  qs('openDsaSandboxBtn')?.addEventListener('click', () => openDsaRunner(activeDsaProblemId || 5));

  qs('runnerCodeEditor')?.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      el.value = el.value.substring(0, start) + '  ' + el.value.substring(end);
      el.selectionStart = el.selectionEnd = start + 2;
    }
  });

  qs('openOutreachBtn')?.addEventListener('click', () => openOutreachModal(state.internships?.[0]?.id));
  qs('closeOutreachModal')?.addEventListener('click', () => qs('internOutreachModal')?.classList.add('hidden'));
  qs('outreachCloseBtn')?.addEventListener('click', () => qs('internOutreachModal')?.classList.add('hidden'));
  document.querySelectorAll('.outreach-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      renderOutreachTemplate(btn.dataset.type);
    });
  });
  qs('outreachCopyBtn')?.addEventListener('click', () => {
    playUiSound('success');
    const bodyText = qs('outreachBody')?.value || '';
    navigator.clipboard?.writeText(bodyText);
    toast('Outreach message copied to clipboard!', 'success');
  });

  document.querySelectorAll('.sm2-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const grade = Number(btn.dataset.grade) || 3;
      rateCurrentFlashcard(grade);
    });
  });

  // Sound effects on buttons
  document.querySelectorAll('.nav button, .btn').forEach(b => {
    b.addEventListener('click', () => playUiSound('click'));
  });

  // Keyboard navigation
  let keySequence = '';
  let sequenceTimer = null;
  document.addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
      if (e.key === 'Escape') document.activeElement.blur();
      return;
    }

    if (e.key === 'Escape') {
      closeDsaRunner();
      closeShortcutsModal();
      qs('internOutreachModal')?.classList.add('hidden');
      qs('confirmModal')?.remove();
      return;
    }

    if (e.key === '?') {
      e.preventDefault();
      openShortcutsModal();
      return;
    }

    if (e.key.toLowerCase() === 't') {
      const toggle = qs('themeToggle') || qs('globalThemeToggle');
      if (toggle) toggle.click();
      return;
    }

    const k = e.key.toLowerCase();
    if (k === 'g') {
      keySequence = 'g';
      clearTimeout(sequenceTimer);
      sequenceTimer = setTimeout(() => { keySequence = ''; }, 1200);
      return;
    }

    if (keySequence === 'g') {
      keySequence = '';
      clearTimeout(sequenceTimer);
      const navMap = {
        'd': 'dashboard',
        'r': 'resume',
        'm': 'interviews',
        's': 'dsa',
        'i': 'internships',
        'p': 'portfolio',
        't': 'tasks',
        'f': 'focus',
        'a': 'ai',
        'n': 'notes'
      };
      if (navMap[k]) {
        e.preventDefault();
        playUiSound('click');
        switchPage(navMap[k]);
        toast(`Navigated to ${navMap[k].toUpperCase()}`, 'info');
      }
    }
  });
}

let __ppAuthOk=false;
try{
  __ppAuthOk=renderAuth();
  if(__ppAuthOk!==false){
    try{ bindStaticEvents(); }catch(e){ console.warn('bindStaticEvents:',e); }
    try{ bindNewModuleEvents(); }catch(e){ console.warn('bindNewModuleEvents:',e); }
    try{ switchPage((location.hash||'').replace('#','')||'dashboard'); }catch(e){ console.warn('initial page:',e); }
    if(!window.__ppHashBound){
      window.__ppHashBound=true;
      window.addEventListener('hashchange',()=>switchPage((location.hash||'').replace('#','')||'dashboard'));
    }

    try{ if(typeof renderStats==='function') renderStats(); }catch(e){console.warn('stats:',e)}
    try{ if(typeof renderDashboard==='function') renderDashboard(); }catch(e){console.warn('dashboard:',e)}
    try{ if(typeof renderQuote==='function') renderQuote(); }catch(e){console.warn('quote:',e)}
    try{ if(typeof renderInsight==='function') renderInsight(); }catch(e){console.warn('insight:',e)}
    try{ if(typeof renderProfile==='function') renderProfile(); }catch(e){console.warn('profile:',e)}
    try{renderPremiumDashboard()}catch(e){console.warn('premium:',e)}

    const rest=[
      renderDashboardOverview,renderTodayProgress,renderTasks,
      renderNotes,renderCalendar,renderTimer,renderFocusExtras,renderFocusLog,
      renderGrades,renderHabits,renderFlashcards,renderExams,renderGoals,renderInternships,renderDailyBriefing,renderTimetable,
      renderAnalytics,renderStudyHeatmap,renderResumeStudio,renderInterviews,renderPortfolioStudio
    ];
    rest.forEach(fn=>{try{if(typeof fn==='function')fn()}catch(e){console.warn('renderer:',e)}});

    try{if(state.timerRunning)startTimer()}catch(e){}
    try{applyAccentColor(state.settings.accent||'#2563eb')}catch(e){}
  }
}catch(err){
  console.error('PathPilot boot error:',err);
  const appRoot=document.getElementById('appRoot');
  if(appRoot) appRoot.classList.remove('hidden');
  const dashboardPage=document.getElementById('dashboardPage');
  if(dashboardPage) dashboardPage.classList.remove('hidden');
}finally{
  // The splash screen must ALWAYS be dismissed, no matter what broke above —
  // otherwise a single renderer error leaves the user stuck on the loading
  // screen forever with no way back in.
  try{
    if(__ppAuthOk!==false) showPathPilotSplash();
    else { const s=document.getElementById('brand-splash'); if(s) s.remove(); }
  }catch(e){
    const s=document.getElementById('brand-splash'); if(s) s.remove();
  }
}
function showPathPilotSplash(){
  const splash=document.getElementById('brand-splash');
  if(!splash)return;
  if(sessionStorage.getItem('pathpilot-entry-splash')!=='1'){splash.remove();return;}
  sessionStorage.removeItem('pathpilot-entry-splash');
  document.body.classList.add('splash-active');
  requestAnimationFrame(()=>splash.classList.add('is-visible'));
  setTimeout(()=>{
    splash.classList.add('is-exiting');
    document.body.classList.remove('splash-active');
    setTimeout(()=>splash.remove(),600);
  },1900);
}

// DARK MODE — three entry points (topbar circle icon, top-right global icon,
// Settings > Appearance). All three read/write the same "pathpilot-theme" key
// and stay in sync via syncButtons().

(function(){
  const topbarToggle = document.getElementById('themeToggle');
  const globalToggle = document.getElementById('globalThemeToggle');
  const settingsToggle = document.getElementById('themeToggleSettings');
  const isDark = () => document.body.classList.contains('dark');

  function syncButtons(){
    if(topbarToggle) topbarToggle.classList.toggle('is-dark', isDark());
    if(globalToggle) globalToggle.classList.toggle('is-dark', isDark());
    if(settingsToggle) settingsToggle.textContent = isDark() ? '☀️ Light' : '🌙 Dark';
  }

  if(localStorage.getItem('pathpilot-theme') === 'dark'){
    document.body.classList.add('dark');
  }
  syncButtons();

  function toggleTheme(){
    document.body.classList.toggle('dark');
    localStorage.setItem('pathpilot-theme', isDark() ? 'dark' : 'light');
    syncButtons();
    if(typeof renderAll==='function'){ try{ renderAll(); }catch(e){} }
  }

  if(topbarToggle) topbarToggle.onclick = toggleTheme;
  if(globalToggle) globalToggle.onclick = toggleTheme;
  if(settingsToggle) settingsToggle.onclick = toggleTheme;
})();
