import { CommonModule } from '@angular/common';
import { Component, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    taskName = '';
    tasks : WritableSignal<string[]> = signal([]);

    addTask(task : HTMLInputElement) : void{
        const item = task.value;
        this.tasks.update((tasks)=>[item, ...tasks]);
        task.value = '';
        task.focus();
      
    }

    removeTask(index : number) : void {
      this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
    }
}
