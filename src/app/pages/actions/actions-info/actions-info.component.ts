import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-actions-info',
  templateUrl: './actions-info.component.html',
  styleUrls: ['./actions-info.component.scss']
})
export class ActionsInfoComponent implements OnInit{
  
  public currentAction!: IActionResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private actionService: ActionService
    ) {}

  ngOnInit(): void {
    this.getOneAction()
  }


  getOneAction(): void {
    const ACTION_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.actionService.getOne(ACTION_ID).subscribe(data => {
      this.currentAction = data;
    })
  }
}
