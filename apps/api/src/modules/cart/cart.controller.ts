import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddCartItemDto, UpdateCartItemDto } from './dto/cart.dto';
import { OptionalJwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(OptionalJwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get current customer or guest cart with totals and shipping threshold' })
  async getCart(@CurrentUser('id') customerId?: string, @Query('guestToken') guestToken?: string) {
    return this.cartService.getOrCreateCart(customerId, guestToken);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add product variant to cart' })
  async addItem(@Body() dto: AddCartItemDto, @CurrentUser('id') customerId?: string) {
    return this.cartService.addItem(dto, customerId);
  }

  @Put('items/:id')
  @ApiOperation({ summary: 'Update cart item quantity' })
  async updateQuantity(
    @Param('id') itemId: string,
    @Body() dto: UpdateCartItemDto,
    @CurrentUser('id') customerId?: string,
    @Query('guestToken') guestToken?: string,
  ) {
    return this.cartService.updateItemQuantity(itemId, dto, customerId, guestToken);
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Remove item from cart' })
  async removeItem(
    @Param('id') itemId: string,
    @CurrentUser('id') customerId?: string,
    @Query('guestToken') guestToken?: string,
  ) {
    return this.cartService.removeItem(itemId, customerId, guestToken);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear all items from current cart' })
  async clearCart(@CurrentUser('id') customerId?: string, @Query('guestToken') guestToken?: string) {
    return this.cartService.clearCart(customerId, guestToken);
  }
}
