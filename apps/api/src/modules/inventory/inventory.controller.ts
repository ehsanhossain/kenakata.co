import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Inventory')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'INVENTORY_MANAGER')
@ApiBearerAuth()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('warehouses')
  @ApiOperation({ summary: 'List active fulfillment warehouses (Admin)' })
  async getWarehouses() {
    return this.inventoryService.getWarehouses();
  }

  @Get('overview')
  @ApiOperation({ summary: 'Get stock level overview and low stock alerts (Admin)' })
  async getStockOverview() {
    return this.inventoryService.getStockOverview();
  }
}
