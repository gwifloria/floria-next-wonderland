import React from "react";

export default function WhisperTechDetails() {
  return (
    <div className="prose prose-sm max-w-none">
      <h3>About Whispers</h3>
      <p>
        Whispers is a personal note-taking and thought-capturing system, similar
        to the concept of a digital commonplace book. This implementation allows
        importing HTML exports from flomo and converting them into a timeline
        format.
      </p>

      <h4>Features</h4>
      <ul>
        <li>
          <strong>HTML Import</strong>: Upload whisper HTML exports and
          automatically parse entries
        </li>
        <li>
          <strong>Timeline View</strong>: Chronological display of thoughts and
          notes with journal aesthetics
        </li>
        <li>
          <strong>Image Support</strong>: Display images attached to entries
          with proper optimization
        </li>
        <li>
          <strong>Tag System</strong>: Automatic hashtag extraction and
          filtering
        </li>
        <li>
          <strong>Search</strong>: Full-text search across all entries
        </li>
        <li>
          <strong>Privacy</strong>: Entries are private by default, following
          the personal journal concept
        </li>
      </ul>

      <h4>Design Philosophy</h4>
      <p>
        Following the site&apos;s journal aesthetic, the whisper interface uses:
      </p>
      <ul>
        <li>Mint green color scheme (#72B385)</li>
        <li>Soft, rounded interfaces with subtle gradients</li>
        <li>Timeline layout reminiscent of a handwritten journal</li>
        <li>Organic, flowing layouts with plenty of whitespace</li>
      </ul>

      <h4>Technical Implementation</h4>
      <ul>
        <li>
          <strong>Database</strong>: MongoDB with Mongoose ODM
        </li>
        <li>
          <strong>Parser</strong>: JSDOM-based HTML parsing for whisper exports
        </li>
        <li>
          <strong>API</strong>: RESTful endpoints for upload, list, and stats
        </li>
        <li>
          <strong>Frontend</strong>: React with SWR for data fetching
        </li>
        <li>
          <strong>Styling</strong>: SCSS modules with Ant Design components
        </li>
      </ul>
    </div>
  );
}
