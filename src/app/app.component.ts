import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  taskName = '';
  tasks: WritableSignal<string[]> = signal([]);

  ngOnInit() {
    // Check for existing data in local storage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        this.tasks.set(JSON.parse(storedTasks)); // Set initial state from storage
      } catch (error) {
        console.error('Error parsing stored tasks:', error);
        // Handle potential parsing errors (e.g., invalid JSON format)
      }
    }
  }

  addTask(task: HTMLInputElement): void {
    const item = task.value;
    this.tasks.update((tasks) => [item, ...tasks]);
    task.value = '';
    task.focus();

    // Store tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  removeTask(index: number): void {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
