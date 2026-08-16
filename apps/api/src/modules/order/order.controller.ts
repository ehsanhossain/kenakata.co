import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { TrackOrderDto, UpdateOrderStatusDto, OrderFilterDto } from './dto/order.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('track')
  @ApiOperation({ summary: 'Public order tracking by order number and phone' })
  async trackOrder(@Body() dto: TrackOrderDto) {
    return this.orderService.trackOrder(dto);
  }

  @Get('my-orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current customer order history' })
  async getMyOrders(
    @CurrentUser('id') customerId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.orderService.getCustomerOrders(customerId, page ? Number(page) : 1, limit ? Number(limit) : 10);
  }

  @Get('by-number/:orderNumber')
  @ApiOperation({ summary: 'Get order details by order number' })
  async getOrderByNumber(@Param('orderNumber') orderNumber: string) {
    return this.orderService.getOrderByNumber(orderNumber);
  }

  // ── Admin Endpoints ──
  @Get('admin/queue')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get admin order processing queue with filters (Admin)' })
  async getAdminOrders(@Query() filters: OrderFilterDto) {
    return this.orderService.getAdminOrders(filters);
  }

  @Put('admin/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order status with audit transition (Admin)' })
  async updateOrderStatus(
    @Param('id') orderId: string,
    @Body() dto: UpdateOrderStatusDto,
    @CurrentUser('id') adminUserId?: string,
  ) {
    return this.orderService.updateOrderStatus(orderId, dto, adminUserId);
  }
}
