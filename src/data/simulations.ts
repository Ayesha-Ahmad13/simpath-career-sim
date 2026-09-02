export type SimOption = {
  id: string;
  label: string;
  response: string;
  points: number;
  quality: "optimal" | "acceptable" | "suboptimal";
};

export type SimScenario = {
  id: string;
  title: string;
  brief: string;
  mission: string;
  context: { label: string; value: string }[];
  contextTitle: string;
  options: SimOption[];
};

export type Simulation = {
  careerId: string;
  title: string;
  role: string;
  intro: string;
  scenarios: SimScenario[];
  skills: { name: string; base: number }[];
  feedback: { strengths: string[]; improve: string[]; summary: string };
};

export const simulations: Record<string, Simulation> = {
  doctor: {
    careerId: "doctor",
    title: "Doctor Simulation",
    role: "Junior Doctor · Emergency Department",
    intro: "A busy Tuesday shift. Triage is full and a new patient has just been wheeled in.",
    skills: [
      { name: "Analytical Thinking", base: 90 },
      { name: "Decision Making", base: 84 },
      { name: "Problem Solving", base: 88 },
      { name: "Communication", base: 76 },
    ],
    feedback: {
      summary:
        "You demonstrated strong analytical thinking and decision-making skills during this simulation. Your escalation timing matched clinical best practice.",
      strengths: ["Strong decision-making", "Good problem analysis", "Efficient use of information"],
      improve: ["Communication", "Time management"],
    },
    scenarios: [
      {
        id: "s1",
        title: "Scenario 01",
        brief:
          "You are working as a junior doctor in an emergency department. A patient arrives complaining of chest pain.",
        mission: "Determine the appropriate next step based on the information available.",
        contextTitle: "Patient Information",
        context: [
          { label: "Age", value: "54, male" },
          { label: "Symptoms", value: "Central chest pain, 40 min, radiating to left arm" },
          { label: "Medical history", value: "Hypertension, smoker, family history of MI" },
          { label: "Available tests", value: "ECG, Troponin, Chest X-ray" },
        ],
        options: [
          {
            id: "a",
            label: "Order an immediate 12-lead ECG",
            response:
              "ECG obtained within 6 minutes. ST elevation in leads II, III and aVF — consistent with an inferior STEMI. Early detection buys critical time.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Ask the patient more questions",
            response:
              "Useful detail gathered: pain started at rest, associated sweating and nausea. Helpful — but with this risk profile the ECG should not wait.",
            points: 14,
            quality: "acceptable",
          },
          {
            id: "c",
            label: "Review full medical history first",
            response:
              "History confirms hypertension and 30 pack-year smoking. Valuable context, though time-critical investigations were delayed by 11 minutes.",
            points: 9,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Make a diagnosis now",
            response:
              "Diagnosing before objective data is risky. Chest pain has many causes — pericarditis and aortic dissection remain undifferentiated.",
            points: 3,
            quality: "suboptimal",
          },
        ],
      },
      {
        id: "s2",
        title: "Scenario 02",
        brief:
          "The ECG confirms an inferior STEMI. The patient's blood pressure is 92/58 and falling slightly.",
        mission: "Choose the safest immediate management step.",
        contextTitle: "Vitals & Findings",
        context: [
          { label: "Blood pressure", value: "92/58 mmHg" },
          { label: "Heart rate", value: "52 bpm" },
          { label: "ECG", value: "ST elevation II, III, aVF" },
          { label: "Allergies", value: "None known" },
        ],
        options: [
          {
            id: "a",
            label: "Activate the cath lab and give aspirin",
            response:
              "Correct. Primary PCI activated at 14 minutes, aspirin 300 mg given. Door-to-balloon time is now on track.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Give sublingual nitrates for the pain",
            response:
              "Caution: nitrates in inferior MI with possible right ventricular involvement and low BP can cause profound hypotension.",
            points: 4,
            quality: "suboptimal",
          },
          {
            id: "c",
            label: "Order a chest X-ray before acting",
            response:
              "Imaging is reasonable but not before reperfusion planning in a confirmed STEMI. Time lost: 9 minutes.",
            points: 8,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Escalate to the on-call cardiologist",
            response:
              "Sensible escalation. The registrar agrees and advises immediate aspirin plus cath lab activation.",
            points: 18,
            quality: "acceptable",
          },
        ],
      },
      {
        id: "s3",
        title: "Scenario 03",
        brief:
          "The patient is stabilised and asks you, visibly frightened, what is happening to him.",
        mission: "Communicate the situation clearly and compassionately.",
        contextTitle: "Situation",
        context: [
          { label: "Patient state", value: "Alert, anxious" },
          { label: "Family present", value: "Wife in waiting area" },
          { label: "Next step", value: "Transfer to cath lab in ~10 min" },
          { label: "Time on shift", value: "6h 20m" },
        ],
        options: [
          {
            id: "a",
            label: "Explain in plain language, check understanding, invite questions",
            response:
              "The patient visibly relaxes. Shared understanding improves consent quality and reduces peri-procedural anxiety.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Give a brief clinical summary using medical terms",
            response:
              "Accurate but the patient looks more confused. Jargon reduces comprehension in high-stress moments.",
            points: 10,
            quality: "suboptimal",
          },
          {
            id: "c",
            label: "Ask the nurse to update him while you write notes",
            response:
              "Efficient, but delegating the explanation loses trust with the patient at a decisive moment.",
            points: 7,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Reassure him briefly and promise details after the procedure",
            response:
              "Partially effective. Reassurance helps, but he still consents without fully understanding the plan.",
            points: 15,
            quality: "acceptable",
          },
        ],
      },
      {
        id: "s4",
        title: "Scenario 04",
        brief:
          "While handing over, you notice a second patient's troponin result has been sitting unreviewed for 25 minutes.",
        mission: "Decide how to handle competing priorities at end of shift.",
        contextTitle: "Handover Context",
        context: [
          { label: "Result", value: "Troponin 480 ng/L (raised)" },
          { label: "Patient", value: "38F, atypical chest pain" },
          { label: "Shift status", value: "Handover in 5 minutes" },
          { label: "Team", value: "Night doctor arriving" },
        ],
        options: [
          {
            id: "a",
            label: "Review the result now and flag it explicitly in handover",
            response:
              "Best practice. The raised troponin is acted on immediately and ownership is unambiguous at handover.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Mention it verbally and let the night team follow up",
            response:
              "Acceptable, though verbal-only handovers of abnormal results are a known source of clinical error.",
            points: 14,
            quality: "acceptable",
          },
          {
            id: "c",
            label: "Leave a note in the chart and go home",
            response:
              "Risky. Written notes without escalation are frequently missed during busy night shifts.",
            points: 5,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Order more tests before deciding",
            response:
              "Additional tests delay the decision. A raised troponin already requires immediate review.",
            points: 8,
            quality: "suboptimal",
          },
        ],
      },
    ],
  },

  "ai-engineer": {
    careerId: "ai-engineer",
    title: "AI Engineer Simulation",
    role: "ML Engineer · Fraud Detection Team",
    intro: "Your model shipped last week. Something is off in production.",
    skills: [
      { name: "Analytical Thinking", base: 92 },
      { name: "Technical Skills", base: 88 },
      { name: "Problem Solving", base: 86 },
      { name: "Communication", base: 72 },
    ],
    feedback: {
      summary:
        "You diagnosed model drift methodically and balanced business risk against technical purity — the mark of a production ML engineer.",
      strengths: ["Systematic debugging", "Metric literacy", "Risk awareness"],
      improve: ["Stakeholder communication", "Documentation"],
    },
    scenarios: [
      {
        id: "s1",
        title: "Scenario 01",
        brief:
          "Your fraud model's precision dropped from 0.91 to 0.68 overnight. Alerts are flooding the ops team.",
        mission: "Identify the most likely cause before changing anything.",
        contextTitle: "Model Telemetry",
        context: [
          { label: "Model", value: "GBM v3.2, deployed 6 days ago" },
          { label: "Recall", value: "Unchanged at 0.84" },
          { label: "Traffic", value: "+340% from a new merchant" },
          { label: "Feature store", value: "Last refresh 14h ago" },
        ],
        options: [
          {
            id: "a",
            label: "Compare feature distributions against training data",
            response:
              "Drift detected: the new merchant's transaction amounts sit far outside the training distribution. Root cause found in 20 minutes.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Roll back to model v3.1 immediately",
            response:
              "Alerts drop, but v3.1 shows the same degradation within an hour — the issue was never the model weights.",
            points: 12,
            quality: "acceptable",
          },
          {
            id: "c",
            label: "Retrain on the last 30 days of data",
            response:
              "A 4-hour retrain produces marginal gains. Retraining without diagnosis is expensive guesswork.",
            points: 7,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Raise the decision threshold to suppress alerts",
            response:
              "Alert volume falls, but you have hidden the symptom and fraud losses increase silently.",
            points: 3,
            quality: "suboptimal",
          },
        ],
      },
      {
        id: "s2",
        title: "Scenario 02",
        brief: "Root cause confirmed as covariate drift. Product wants a fix before the weekend.",
        mission: "Choose the intervention with the best risk/reward.",
        contextTitle: "Constraints",
        context: [
          { label: "Time", value: "36 hours to weekend peak" },
          { label: "Labelled data", value: "Only 3 days for new merchant" },
          { label: "Compute", value: "Available" },
          { label: "Rollback", value: "Possible in 5 minutes" },
        ],
        options: [
          {
            id: "a",
            label: "Ship a segment-specific threshold + shadow-test a retrained model",
            response:
              "Strong call. Immediate mitigation for ops, plus a validated path to a permanent fix without risking production.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Retrain with the 3 days of new labels and deploy",
            response:
              "Precision recovers to 0.79 but the sample is small — you have likely overfitted to a short window.",
            points: 13,
            quality: "acceptable",
          },
          {
            id: "c",
            label: "Do nothing until more labels arrive",
            response:
              "Statistically defensible, operationally unacceptable. The ops team burns out on false positives.",
            points: 6,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Exclude the merchant from scoring entirely",
            response:
              "Alerts normalise, but unscored traffic is exactly where fraud will concentrate next.",
            points: 4,
            quality: "suboptimal",
          },
        ],
      },
      {
        id: "s3",
        title: "Scenario 03",
        brief: "The VP of Product asks: \"Can we trust this model or not?\"",
        mission: "Communicate model risk to a non-technical stakeholder.",
        contextTitle: "Audience",
        context: [
          { label: "Stakeholder", value: "VP Product, non-technical" },
          { label: "Time", value: "5 minutes in a standup" },
          { label: "Current precision", value: "0.86 post-mitigation" },
          { label: "Concern", value: "Customer complaints" },
        ],
        options: [
          {
            id: "a",
            label: "Frame it in business terms: blocked fraud vs. blocked good customers",
            response:
              "The VP immediately understands the trade-off and approves the monitoring budget you needed.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Show the precision-recall curve and drift plots",
            response:
              "Technically complete, but the room disengages. Half the message lands.",
            points: 12,
            quality: "acceptable",
          },
          {
            id: "c",
            label: "Say the model is fine now",
            response:
              "Reassuring but incomplete — when drift recurs, credibility takes the damage.",
            points: 5,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Send a detailed written postmortem instead",
            response:
              "Good artefact, wrong moment. The decision needed to happen in the room.",
            points: 14,
            quality: "acceptable",
          },
        ],
      },
    ],
  },

  lawyer: {
    careerId: "lawyer",
    title: "Lawyer Simulation",
    role: "Associate · Commercial Litigation",
    intro: "A client's contract dispute lands on your desk with a hearing in two weeks.",
    skills: [
      { name: "Analytical Thinking", base: 86 },
      { name: "Communication", base: 88 },
      { name: "Problem Solving", base: 80 },
      { name: "Leadership", base: 70 },
    ],
    feedback: {
      summary:
        "You built your argument from the evidence outward rather than from the conclusion backward — the strongest habit in litigation.",
      strengths: ["Evidence-first reasoning", "Clear written argument", "Client management"],
      improve: ["Time estimation", "Delegation"],
    },
    scenarios: [
      {
        id: "s1",
        title: "Scenario 01",
        brief:
          "Your client claims a supplier breached a delivery clause, costing them £240,000.",
        mission: "Decide the first action to build the case.",
        contextTitle: "Case File",
        context: [
          { label: "Contract", value: "Signed, 34 pages, force majeure clause present" },
          { label: "Evidence", value: "Email chain, delivery logs" },
          { label: "Hearing", value: "In 14 days" },
          { label: "Client mood", value: "Wants to sue immediately" },
        ],
        options: [
          {
            id: "a",
            label: "Read the contract end to end, mapping every relevant clause",
            response:
              "Clause 11.4 makes delivery timing conditional on client-side site access — a decisive detail you would have missed.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Interview the client for the full narrative",
            response:
              "Useful context and it builds trust, but the client's account already conflicts with the delivery logs.",
            points: 16,
            quality: "acceptable",
          },
          {
            id: "c",
            label: "File the claim to apply pressure",
            response:
              "Filing before understanding clause 11.4 exposes your client to an adverse costs order.",
            points: 4,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Request disclosure from the supplier",
            response:
              "Reasonable, though disclosure takes weeks — you need your own documents mapped first.",
            points: 10,
            quality: "suboptimal",
          },
        ],
      },
      {
        id: "s2",
        title: "Scenario 02",
        brief:
          "Clause 11.4 weakens your client's position. The supplier offers to settle at £90,000.",
        mission: "Advise your client.",
        contextTitle: "Settlement Context",
        context: [
          { label: "Claim value", value: "£240,000" },
          { label: "Offer", value: "£90,000" },
          { label: "Litigation cost estimate", value: "£70,000-£110,000" },
          { label: "Win probability", value: "~45%" },
        ],
        options: [
          {
            id: "a",
            label: "Present expected value honestly and recommend negotiating upward",
            response:
              "You counter at £150,000 and settle at £128,000 — materially better than the risk-adjusted litigation outcome.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Accept the offer to avoid risk",
            response:
              "Safe, but you left value on the table without testing the supplier's appetite.",
            points: 14,
            quality: "acceptable",
          },
          {
            id: "c",
            label: "Reject and proceed to trial",
            response:
              "With a 45% win probability and heavy costs, this is a poor risk-adjusted recommendation.",
            points: 6,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Let the client decide without a recommendation",
            response:
              "Clients pay for judgement, not just options. The client feels unsupported.",
            points: 8,
            quality: "suboptimal",
          },
        ],
      },
      {
        id: "s3",
        title: "Scenario 03",
        brief: "A junior paralegal misfiled a witness statement, and the deadline is tomorrow.",
        mission: "Handle the error professionally.",
        contextTitle: "Situation",
        context: [
          { label: "Deadline", value: "Tomorrow, 16:00" },
          { label: "Impact", value: "Statement may be excluded" },
          { label: "Team", value: "One paralegal, one trainee" },
          { label: "Partner", value: "Unaware" },
        ],
        options: [
          {
            id: "a",
            label: "Fix it, notify the partner immediately, then debrief the paralegal privately",
            response:
              "Filed in time, transparency preserved, and the paralegal learns without being humiliated.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Fix it quietly without telling anyone",
            response:
              "Resolved, but a supervising partner discovering it later would be far worse.",
            points: 9,
            quality: "suboptimal",
          },
          {
            id: "c",
            label: "Escalate to the partner and let them handle it",
            response:
              "Transparent, but you passed up ownership of a problem within your competence.",
            points: 15,
            quality: "acceptable",
          },
          {
            id: "d",
            label: "Ask for a deadline extension",
            response:
              "Possible, though extensions signal a lack of control to opposing counsel.",
            points: 11,
            quality: "suboptimal",
          },
        ],
      },
    ],
  },

  entrepreneur: {
    careerId: "entrepreneur",
    title: "Entrepreneur Simulation",
    role: "Founder · Seed-stage SaaS",
    intro: "Eight months of runway, a small team, and one big decision every week.",
    skills: [
      { name: "Decision Making", base: 88 },
      { name: "Leadership", base: 82 },
      { name: "Analytical Thinking", base: 78 },
      { name: "Communication", base: 84 },
    ],
    feedback: {
      summary:
        "You protected runway while still investing in learning — the balance most first-time founders get wrong.",
      strengths: ["Capital discipline", "Customer focus", "Decisive under uncertainty"],
      improve: ["Delegation", "Long-range planning"],
    },
    scenarios: [
      {
        id: "s1",
        title: "Scenario 01",
        brief: "Growth flattened for three months. You have £180k left and a team of five.",
        mission: "Choose where to focus the next 6 weeks.",
        contextTitle: "Company Snapshot",
        context: [
          { label: "MRR", value: "£24,000, flat" },
          { label: "Churn", value: "6.2% monthly" },
          { label: "Runway", value: "8 months" },
          { label: "Team", value: "2 eng, 1 design, 2 sales" },
        ],
        options: [
          {
            id: "a",
            label: "Interview 20 churned customers before changing anything",
            response:
              "Pattern found: 14 of 20 churned because onboarding took over two weeks. A fixable, high-leverage problem.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Double down on paid acquisition",
            response:
              "New signups rise 30%, but with 6.2% churn you are filling a leaking bucket at higher cost.",
            points: 8,
            quality: "suboptimal",
          },
          {
            id: "c",
            label: "Ship the most-requested feature",
            response:
              "Some customers are delighted; overall retention barely moves. Requests are not always causes.",
            points: 12,
            quality: "acceptable",
          },
          {
            id: "d",
            label: "Start raising a bridge round",
            response:
              "Investors ask why growth is flat. Without an answer, the raise stalls and burns six weeks.",
            points: 6,
            quality: "suboptimal",
          },
        ],
      },
      {
        id: "s2",
        title: "Scenario 02",
        brief: "Onboarding is the problem. Fixing it properly takes both engineers for a month.",
        mission: "Allocate your scarcest resource.",
        contextTitle: "Trade-offs",
        context: [
          { label: "Eng capacity", value: "2 engineers" },
          { label: "Enterprise deal", value: "£60k ARR, needs SSO" },
          { label: "Onboarding fix", value: "4 weeks, both engineers" },
          { label: "Runway", value: "7 months" },
        ],
        options: [
          {
            id: "a",
            label: "Fix onboarding first, delay the enterprise deal by a month",
            response:
              "The prospect waits. Churn drops to 3.1% within two months, adding more value than the single deal.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Split engineers across both",
            response:
              "Both ship late and half-finished. Context switching costs you roughly 30% of capacity.",
            points: 9,
            quality: "suboptimal",
          },
          {
            id: "c",
            label: "Take the enterprise deal, patch onboarding manually",
            response:
              "Revenue lands and manual onboarding buys time — but it does not scale and it consumes your week.",
            points: 15,
            quality: "acceptable",
          },
          {
            id: "d",
            label: "Hire a contractor for SSO",
            response:
              "Pragmatic, though onboarding a contractor into your codebase costs more time than expected.",
            points: 17,
            quality: "acceptable",
          },
        ],
      },
      {
        id: "s3",
        title: "Scenario 03",
        brief: "Your best engineer tells you she has a competing offer at 40% more pay.",
        mission: "Respond as a founder, not just an employer.",
        contextTitle: "Context",
        context: [
          { label: "Person", value: "Lead engineer, 2 years tenure" },
          { label: "Cash", value: "Tight" },
          { label: "Equity pool", value: "3% unallocated" },
          { label: "Impact if she leaves", value: "Severe" },
        ],
        options: [
          {
            id: "a",
            label: "Ask what she actually wants, then design a counter around it",
            response:
              "She wanted ownership of the platform roadmap more than cash. Equity refresh plus scope change — she stays.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Match the salary immediately",
            response:
              "She stays for now, but the raise breaks your comp bands and the underlying reason went unaddressed.",
            points: 13,
            quality: "acceptable",
          },
          {
            id: "c",
            label: "Let her go and hire a replacement",
            response:
              "Replacement cost and lost context set the roadmap back roughly four months.",
            points: 6,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Appeal to the mission",
            response:
              "Mission matters, but on its own it reads as avoidance of a real compensation conversation.",
            points: 9,
            quality: "suboptimal",
          },
        ],
      },
    ],
  },

  "software-engineer": {
    careerId: "software-engineer",
    title: "Software Engineer Simulation",
    role: "Backend Engineer · Payments Platform",
    intro: "It's 09:40 and checkout latency just tripled.",
    skills: [
      { name: "Problem Solving", base: 90 },
      { name: "Technical Skills", base: 87 },
      { name: "Analytical Thinking", base: 85 },
      { name: "Communication", base: 74 },
    ],
    feedback: {
      summary:
        "You stabilised the system before optimising it, and you left the codebase better than you found it.",
      strengths: ["Incident triage", "Root-cause discipline", "Pragmatic trade-offs"],
      improve: ["Incident comms", "Test coverage"],
    },
    scenarios: [
      {
        id: "s1",
        title: "Scenario 01",
        brief: "Checkout p95 latency jumped from 240ms to 1.8s after this morning's deploy.",
        mission: "Take the correct first action during a live incident.",
        contextTitle: "System State",
        context: [
          { label: "Deploy", value: "12 minutes ago" },
          { label: "Error rate", value: "Normal (0.2%)" },
          { label: "DB CPU", value: "94%" },
          { label: "Traffic", value: "Normal for time of day" },
        ],
        options: [
          {
            id: "a",
            label: "Roll back the deploy, then investigate",
            response:
              "Latency returns to 250ms within 3 minutes. Customers are protected while you diagnose calmly.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Read the deploy diff to find the cause first",
            response:
              "You spot an N+1 query after 15 minutes — correct diagnosis, but customers suffered throughout.",
            points: 14,
            quality: "acceptable",
          },
          {
            id: "c",
            label: "Scale up the database instance",
            response:
              "Latency improves to 900ms. You bought time at real cost without addressing the cause.",
            points: 9,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Add caching to the checkout endpoint",
            response:
              "Shipping new code during an active incident adds risk on top of risk.",
            points: 4,
            quality: "suboptimal",
          },
        ],
      },
      {
        id: "s2",
        title: "Scenario 02",
        brief: "Root cause: an ORM change introduced an N+1 query across order items.",
        mission: "Choose the fix you would put in review.",
        contextTitle: "Code Context",
        context: [
          { label: "Hot path", value: "GET /checkout/summary" },
          { label: "Avg items/order", value: "7" },
          { label: "Existing tests", value: "No query-count assertions" },
          { label: "Reviewers", value: "2 available" },
        ],
        options: [
          {
            id: "a",
            label: "Eager-load the relation and add a query-count regression test",
            response:
              "Clean fix plus a guard rail. This exact class of bug cannot silently return.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Eager-load the relation",
            response:
              "Correct fix, but nothing prevents the next refactor from reintroducing it.",
            points: 17,
            quality: "acceptable",
          },
          {
            id: "c",
            label: "Cache the summary response for 30 seconds",
            response:
              "Latency improves, but stale carts create a subtle correctness bug in payments.",
            points: 7,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Revert the ORM upgrade permanently",
            response:
              "Avoids the symptom and freezes the codebase on an old dependency. Technical debt deferred, not removed.",
            points: 6,
            quality: "suboptimal",
          },
        ],
      },
      {
        id: "s3",
        title: "Scenario 03",
        brief: "Support asks for an update. Leadership asks whether revenue was affected.",
        mission: "Communicate during and after the incident.",
        contextTitle: "Audience",
        context: [
          { label: "Duration", value: "18 minutes degraded" },
          { label: "Failed checkouts", value: "31" },
          { label: "Status page", value: "Not yet updated" },
          { label: "Postmortem", value: "Not started" },
        ],
        options: [
          {
            id: "a",
            label: "Post a concise status update with impact numbers, then write the postmortem",
            response:
              "Support can answer customers, leadership has the number they asked for, and the fix is documented.",
            points: 25,
            quality: "optimal",
          },
          {
            id: "b",
            label: "Reply in the engineering channel only",
            response:
              "Your team is informed; support and customers are still guessing.",
            points: 10,
            quality: "suboptimal",
          },
          {
            id: "c",
            label: "Wait until the postmortem is complete to communicate",
            response:
              "Thorough but slow. Silence during an incident erodes trust faster than imperfect information.",
            points: 8,
            quality: "suboptimal",
          },
          {
            id: "d",
            label: "Send a short summary to leadership",
            response:
              "Leadership is satisfied, though support is left without a customer-facing message.",
            points: 15,
            quality: "acceptable",
          },
        ],
      },
    ],
  },
};

export const getSimulation = (careerId: string) => simulations[careerId];
export const availableSimulationIds = Object.keys(simulations);
