class UserAgentModel {
  constructor() {
    this.userAgents = [];
    this.mockData = [
      "PostmanRuntime/7.43.2",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/135.0.0.0",
      "Thunder Client (https://www.thunderclient.com)",
      "curl/8.12.1",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Edge/18.18362",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/120.0.0.0 Safari/537.36",
      "curl/7.68.0",
      "PostmanRuntime/7.30.0",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Edge/119.0.0.0",
      "Thunder Client (https://www.thunderclient.com)",
    ];
  }

  // Categorize user-agent string
  categorizeUserAgent(userAgent) {
    const ua = userAgent.toLowerCase();
    if (ua.includes("postman")) {
      return "Postman";
    } else if (ua.includes("thunder client")) {
      return "Thunder Client";
    } else if (ua.includes("edg/")) { // Check for Edge Chromium first
      return "Edge Browser";
    } else if (ua.includes("edge")) { // Legacy Edge
      return "Edge Browser";
    } else if (ua.includes("chrome")) {
      return "Chrome Browser";
    } else if (ua.includes("curl")) {
      return "curl";
    } else {
      return "Other";
    }
  }

  // Analyze user-agents and return counts
  analyzeUserAgents(userAgents = null) {
    const agentsToAnalyze = userAgents || this.mockData;
    const categories = {
      Postman: 0,
      "Thunder Client": 0,
      "Chrome Browser": 0,
      "Edge Browser": 0,
      curl: 0,
      Other: 0,
    };

    agentsToAnalyze.forEach((agent) => {
      const category = this.categorizeUserAgent(agent);
      categories[category]++;
    });

    return categories;
  }

  // Store real user-agent data
  storeUserAgent(userAgent) {
    this.userAgents.push({
      userAgent,
      timestamp: new Date().toISOString(),
      category: this.categorizeUserAgent(userAgent),
    });
  }

  // Get real user-agent data (with optional date filtering)
  getRealUserAgents(startDate = null, endDate = null) {
    let filteredData = this.userAgents;
    
    if (startDate) {
      filteredData = filteredData.filter(
        (entry) => new Date(entry.timestamp) >= new Date(startDate)
      );
    }

    if (endDate) {
      filteredData = filteredData.filter(
        (entry) => new Date(entry.timestamp) <= new Date(endDate)
      );
    }

    return filteredData.map((entry) => entry.userAgent);
  }

  // Get analytics for real data
  getRealAnalytics(startDate = null, endDate = null) {
    const realUserAgents = this.getRealUserAgents(startDate, endDate);
    return this.analyzeUserAgents(realUserAgents);
  }

  // Get all stored user-agents
  getAllUserAgents() {
    return this.userAgents;
  }
}

export default new UserAgentModel();
