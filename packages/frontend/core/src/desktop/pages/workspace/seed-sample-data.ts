import { WorkspaceDBService } from '@affine/core/modules/db';
import { DocsService } from '@affine/core/modules/doc';
import { SpaceService } from '@affine/core/modules/space';
import { useServices } from '@toeverything/infra';
import { useEffect, useRef } from 'react';

/**
 * Seeds the workspace with sample data if no spaces exist.
 * Safe to run repeatedly — only seeds when the workspace is empty.
 */
export function useSeedSampleData() {
  const { spaceService, docsService, workspaceDBService } = useServices({
    SpaceService,
    DocsService,
    WorkspaceDBService,
  });
  const seeded = useRef(false);

  useEffect(() => {
    if (seeded.current) return;
    seeded.current = true;

    // Wait for DB to be ready, then seed if no spaces exist
    const timer = setTimeout(() => {
      try {
        const existingSpaces = workspaceDBService.db.spaces.find({});
        if (existingSpaces.length > 0) return;
      } catch {
        // DB not ready yet — skip
        return;
      }

      seedData();
    }, 2000);

    return () => clearTimeout(timer);

    function seedData() {
      const db = workspaceDBService.db;

      // Helper: create doc with title and assign to space
      const createDoc = (title: string, spaceId: string) => {
        const doc = docsService.createDoc({ title });
        db.docProperties.update(doc.id, { spaceId });
        return doc.id;
      };

      // ═══════════════════════════════════════════════════════════════════
      // 1. SPACES + SUB-SPACES
      // ═══════════════════════════════════════════════════════════════════

      const officeId = spaceService.createSpace('Office');
      const personalId = spaceService.createSpace('Personal');
      const sideProjectsId = spaceService.createSpace('Side Projects');
      const ideasId = spaceService.createSpace('Ideas');

      // Office sub-spaces
      const standupsId = spaceService.createSpace('Standups', officeId);
      const clientMeetingsId = spaceService.createSpace(
        'Client Meetings',
        officeId
      );
      const designId = spaceService.createSpace('Design Discussions', officeId);

      // Personal sub-spaces
      const foodId = spaceService.createSpace('Food & Recipes', personalId);
      const linksId = spaceService.createSpace('Links & Bookmarks', personalId);
      const budgetId = spaceService.createSpace('Budget', personalId);

      // Side Projects sub-spaces
      const projectAId = spaceService.createSpace(
        'Project A — Ploy-Note',
        sideProjectsId
      );
      const projectBId = spaceService.createSpace(
        'Project B — CLI Tool',
        sideProjectsId
      );
      const freelanceId = spaceService.createSpace(
        'Freelance Client X',
        sideProjectsId
      );

      // Ideas sub-spaces
      const productIdeasId = spaceService.createSpace('Product Ideas', ideasId);
      const writingIdeasId = spaceService.createSpace('Writing Ideas', ideasId);

      // ═══════════════════════════════════════════════════════════════════
      // 2. DOCUMENTS
      // ═══════════════════════════════════════════════════════════════════

      // Office
      createDoc('Sprint Planning Q1', officeId);
      createDoc('Code Review Guidelines', officeId);
      createDoc('Team OKRs 2024', officeId);

      // Office > Standups
      createDoc('Standup Mar 25', standupsId);
      createDoc('Standup Mar 26', standupsId);
      createDoc('Standup Mar 27', standupsId);

      // Office > Client Meetings
      createDoc('Acme Call Mar 12', clientMeetingsId);
      createDoc('Acme Call Mar 20', clientMeetingsId);
      createDoc('Acme Follow-up Actions', clientMeetingsId);

      // Office > Design Discussions
      createDoc('Auth Flow Redesign', designId);
      createDoc('Dashboard Layout v2', designId);

      // Personal
      createDoc('Weekly Reflection', personalId);
      createDoc('Things to Buy', personalId);

      // Personal > Food & Recipes
      createDoc('Pasta Carbonara', foodId);
      createDoc('Thai Green Curry', foodId);

      // Personal > Links & Bookmarks
      createDoc('Interesting Articles', linksId);
      createDoc('Dev Tools Collection', linksId);

      // Personal > Budget
      createDoc('March Budget', budgetId);
      createDoc('Subscription Tracker', budgetId);

      // Side Projects
      createDoc('Project Ideas Backlog', sideProjectsId);

      // Side Projects > Project A
      createDoc('Architecture Overview', projectAId);
      createDoc('Feature Roadmap', projectAId);
      createDoc('Bug Tracker', projectAId);

      // Side Projects > Project B
      createDoc('CLI Design Doc', projectBId);
      createDoc('Release Checklist', projectBId);

      // Side Projects > Freelance Client X
      createDoc('Proposal Draft', freelanceId);
      createDoc('Meeting Notes Feb', freelanceId);
      createDoc('Invoice Tracker', freelanceId);

      // Ideas
      createDoc('Random Shower Thoughts', ideasId);
      createDoc('App Ideas', ideasId);

      // Ideas > Product Ideas
      createDoc('AI Note-Taking', productIdeasId);
      createDoc('Voice Memo Transcriber', productIdeasId);

      // Ideas > Writing Ideas
      createDoc('Blog Post Topics', writingIdeasId);
      createDoc('Newsletter Outline', writingIdeasId);

      // ═══════════════════════════════════════════════════════════════════
      // 3. SPACE MEMORIES
      // ═══════════════════════════════════════════════════════════════════

      const addMemory = (spaceId: string, content: string) => {
        db.spaceMemory.create({ spaceId, content, createdAt: Date.now() });
      };

      // Office
      addMemory(officeId, 'Sprint ends Friday');
      addMemory(officeId, 'Team standup at 9:30 AM daily');
      addMemory(
        officeId,
        'Acme Corp is our key client — pricing due end of month'
      );

      // Personal
      addMemory(personalId, 'Rent is $2000/month');
      addMemory(personalId, 'Gym membership expires April 15');

      // Side Projects
      addMemory(
        sideProjectsId,
        'Project A uses React + TypeScript + BlockSuite'
      );
      addMemory(sideProjectsId, 'Freelance rate is $150/hr');

      // Ideas
      addMemory(ideasId, 'Best ideas come during walks — capture immediately');
      addMemory(ideasId, 'Review idea backlog every Sunday');

      // ═══════════════════════════════════════════════════════════════════
      // 4. CHAT MESSAGES
      // ═══════════════════════════════════════════════════════════════════

      const addChat = (spaceId: string, role: string, content: string) => {
        db.spaceChatMessage.create({
          spaceId,
          role,
          content,
          createdAt: Date.now(),
        });
      };

      // Office chat
      addChat(
        officeId,
        'user',
        'What are the open action items from client meetings?'
      );
      addChat(
        officeId,
        'assistant',
        'Based on the Client Meetings sub-space, the main open items are:\n\n1. Send updated pricing proposal to Acme Corp (due end of month)\n2. Schedule follow-up call with their engineering team\n3. Prepare demo environment for next Tuesday'
      );

      // Personal chat
      addChat(personalId, 'user', 'How much am I spending on subscriptions?');
      addChat(
        personalId,
        'assistant',
        'Based on your Budget sub-space, I can see you have a Subscription Tracker doc. You should check it for the latest numbers. Your rent is $2000/month, and your gym membership expires April 15.'
      );

      // Side Projects chat
      addChat(sideProjectsId, 'user', 'What is the architecture of Project A?');
      addChat(
        sideProjectsId,
        'assistant',
        'Project A (Ploy-Note) uses React + TypeScript + BlockSuite. The Architecture Overview doc in that sub-space should have the full details. The project has 3 docs: Architecture Overview, Feature Roadmap, and Bug Tracker.'
      );

      // Ideas chat
      addChat(ideasId, 'user', 'What are my best product ideas?');
      addChat(
        ideasId,
        'assistant',
        'You have two product ideas documented in the Product Ideas sub-space:\n\n1. AI Note-Taking — could integrate with your Ploy-Note project\n2. Voice Memo Transcriber — pairs well with the meeting capture concept\n\nBoth could connect to your Side Projects space for implementation.'
      );

      // ═══════════════════════════════════════════════════════════════════
      // 5. WORKSPACE CHAT
      // ═══════════════════════════════════════════════════════════════════

      db.workspaceChatMessage.create({
        role: 'user',
        content: 'What did the client say about pricing last week?',
        createdAt: Date.now(),
      });
      db.workspaceChatMessage.create({
        role: 'assistant',
        content:
          'Looking across your workspace, I found relevant context in the Office space:\n\nIn the Client Meetings sub-space, the "Acme Call Mar 20" notes indicate that Acme needs updated pricing by end of month. This connects to the action item from the Mar 12 call where they first raised budget concerns.\n\nYour Office memory also confirms: "Acme Corp is our key client — pricing due end of month."',
        createdAt: Date.now(),
      });

      // ═══════════════════════════════════════════════════════════════════
      // 6. DUMP ITEMS (inbox)
      // ═══════════════════════════════════════════════════════════════════

      const addDump = (
        type: string,
        content: string,
        opts?: { sourceUrl?: string; suggestedSpaceId?: string }
      ) => {
        db.dumpItems.create({
          type,
          content,
          sourceUrl: opts?.sourceUrl,
          suggestedSpaceId: opts?.suggestedSpaceId,
          isProcessed: true,
          createdAt: Date.now(),
        });
      };

      addDump(
        'text',
        'Check out that new VS Code extension for AI code review',
        {
          suggestedSpaceId: officeId,
        }
      );
      addDump('url', 'https://example.com/react-performance-tips', {
        sourceUrl: 'https://example.com/react-performance-tips',
        suggestedSpaceId: sideProjectsId,
      });
      addDump('text', 'Remember to book dentist appointment next Tuesday', {
        suggestedSpaceId: personalId,
      });
      addDump(
        'text',
        'Pasta recipe from yesterday: use pecorino not parmesan, add pasta water',
        { suggestedSpaceId: foodId }
      );
      addDump('text', 'New project idea: habit tracker with AI coaching', {
        suggestedSpaceId: ideasId,
      });

      // ═══════════════════════════════════════════════════════════════════
      // 7. CROSS-SPACE CONNECTIONS
      // ═══════════════════════════════════════════════════════════════════

      db.crossSpaceConnections.create({
        sourceSpaceId: officeId,
        targetSpaceId: sideProjectsId,
        label: 'Code & architecture overlap',
        strength: 0.8,
        createdAt: Date.now(),
      });

      db.crossSpaceConnections.create({
        sourceSpaceId: ideasId,
        targetSpaceId: sideProjectsId,
        label: 'Ideas feed into projects',
        strength: 0.7,
        createdAt: Date.now(),
      });

      db.crossSpaceConnections.create({
        sourceSpaceId: personalId,
        targetSpaceId: ideasId,
        label: 'Personal interests spark ideas',
        strength: 0.5,
        createdAt: Date.now(),
      });

      console.log('[Ploy-Note] Sample data seeded successfully');
    } // end seedData
  }, [spaceService, docsService, workspaceDBService]);
}
