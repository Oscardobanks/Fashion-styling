import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initSidebar();
    this.initConversation();
  }

  initSidebar(): void {
    const sidebarToggle = document.querySelector(
      '.chat-sidebar-profile-toggle'
    );
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const parent = (e.target as HTMLElement).parentElement;
        if (parent) {
          parent.classList.toggle('active');
        }
      });

      document.addEventListener('click', (e: Event) => {
        if (
          !(e.target as Element).matches(
            '.chat-sidebar-profile, .chat-sidebar-profile *'
          )
        ) {
          const sidebarProfile = document.querySelector(
            '.chat-sidebar-profile'
          );
          if (sidebarProfile) {
            sidebarProfile.classList.remove('active');
          }
        }
      });
    }
  }

  initConversation(): void {
    const dropdownToggles = document.querySelectorAll(
      '.conversation-item-dropdown-toggle'
    );
    dropdownToggles.forEach((item) => {
      item.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const parent = (e.target as HTMLElement).parentElement;
        if (parent) {
          if (parent.classList.contains('active')) {
            parent.classList.remove('active');
          } else {
            document
              .querySelectorAll('.conversation-item-dropdown')
              .forEach((i) => {
                i.classList.remove('active');
              });
            parent.classList.add('active');
          }
        }
      });
    });

    document.addEventListener('click', (e: Event) => {
      if (
        !(e.target as Element).matches(
          '.conversation-item-dropdown, .conversation-item-dropdown *'
        )
      ) {
        document
          .querySelectorAll('.conversation-item-dropdown')
          .forEach((i) => {
            i.classList.remove('active');
          });
      }
    });

    const inputFields = document.querySelectorAll('.conversation-form-input');
    inputFields.forEach((item) => {
      item.addEventListener('input', () => {
        const target = item as HTMLTextAreaElement;
        target.rows = target.value.split('\n').length;
      });
    });

    const conversationLinks = document.querySelectorAll('[data-conversation]');
    conversationLinks.forEach((item) => {
      item.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const conversationId = target.getAttribute('data-conversation');
        if (conversationId) {
          document.querySelectorAll('.conversation').forEach((i) => {
            i.classList.remove('active');
          });
          const conversation = document.querySelector(
            `[data-conversation="${conversationId}"]`
          );
          if (conversation) {
            conversation.classList.add('active');
          }
        }
      });
    });

    const backButtons = document.querySelectorAll('.conversation-back');
    backButtons.forEach((item) => {
      item.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const closestConversation = (e.target as HTMLElement).closest(
          '.conversation'
        );
        if (closestConversation) {
          closestConversation.classList.remove('active');
        }
        const defaultConversation = document.querySelector(
          '.conversation-default'
        );
        if (defaultConversation) {
          defaultConversation.classList.add('active');
        }
      });
    });
  }
}
