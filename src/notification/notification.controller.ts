/* eslint-disable prettier/prettier */
import {  
  Controller,  
  Get,  
  Param,  
  Put,  
  Delete,  
  UseGuards,  
  Req,
  ParseIntPipe
} from '@nestjs/common'; 
import { NotificationService } from './notification.service'; 
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam 
} from '@nestjs/swagger'; 
import { NotificationDto } from './dto/notification.dto'; 

@ApiTags('Notifications') 
@Controller('notifications') 
@UseGuards(JwtAuthGuard) 
@ApiResponse({ 
  status: 401, 
  description: 'Unauthorized' 
})
export class NotificationController { 
  constructor(private readonly notificationService: NotificationService) {} 
 
  @Get() 
  @ApiOperation({ summary: 'Get all user notifications' }) 
  @ApiResponse({ 
      status: 200, 
      description: 'List of user notifications', 
      type: [NotificationDto] 
  })
  async getUserNotifications(@Req() req) { 
      return this.notificationService.getUserNotifications(req.user.id); 
  } 
 
  @Put(':id/read') 
  @ApiOperation({ summary: 'Mark notification as read' }) 
  @ApiParam({ 
      name: 'id', 
      type: 'string', 
      description: 'Notification ID to mark as read' 
  })
  @ApiResponse({ 
      status: 200, 
      description: 'Notification marked as read' 
  })
  async markAsRead( 
      @Param('id', ParseIntPipe) id: number,  
      @Req() req 
  ) { 
      return this.notificationService.markNotificationAsRead( 
          id,  
          req.user.id 
      ); 
  } 
 
  @Delete(':id') 
  @ApiOperation({ summary: 'Delete a notification' }) 
  @ApiParam({ 
      name: 'id', 
      type: 'string', 
      description: 'Notification ID to delete' 
  })
  @ApiResponse({ 
      status: 200, 
      description: 'Notification deleted successfully' 
  })
  async deleteNotification( 
      @Param('id', ParseIntPipe) id: number,  
      @Req() req 
  ) { 
      return this.notificationService.deleteNotification( 
          id,  
          req.user.id 
      ); 
  } 
}