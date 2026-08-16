import { Controller, Get, Put, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { UpdateProfileDto, CreateAddressDto, UpdateAddressDto } from './dto/customer.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('Customer')
@Controller('customer')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current customer profile with addresses count' })
  async getProfile(@CurrentUser('id') customerId: string) {
    return this.customerService.getProfile(customerId);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update customer profile (name, email, locale)' })
  async updateProfile(@CurrentUser('id') customerId: string, @Body() dto: UpdateProfileDto) {
    return this.customerService.updateProfile(customerId, dto);
  }

  @Get('addresses')
  @ApiOperation({ summary: 'List all addresses for current customer' })
  async getAddresses(@CurrentUser('id') customerId: string) {
    return this.customerService.getAddresses(customerId);
  }

  @Post('addresses')
  @ApiOperation({ summary: 'Add a new shipping address' })
  async createAddress(@CurrentUser('id') customerId: string, @Body() dto: CreateAddressDto) {
    return this.customerService.createAddress(customerId, dto);
  }

  @Put('addresses/:id')
  @ApiOperation({ summary: 'Update an existing shipping address' })
  async updateAddress(
    @CurrentUser('id') customerId: string,
    @Param('id') addressId: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.customerService.updateAddress(customerId, addressId, dto);
  }

  @Delete('addresses/:id')
  @ApiOperation({ summary: 'Delete a shipping address' })
  async deleteAddress(@CurrentUser('id') customerId: string, @Param('id') addressId: string) {
    return this.customerService.deleteAddress(customerId, addressId);
  }

  @Get('wishlist')
  @ApiOperation({ summary: 'Get customer wishlist items' })
  async getWishlist(@CurrentUser('id') customerId: string) {
    return this.customerService.getWishlist(customerId);
  }

  @Post('wishlist/:productId')
  @ApiOperation({ summary: 'Add a product to wishlist' })
  async addToWishlist(@CurrentUser('id') customerId: string, @Param('productId') productId: string) {
    return this.customerService.addToWishlist(customerId, productId);
  }

  @Delete('wishlist/:productId')
  @ApiOperation({ summary: 'Remove a product from wishlist' })
  async removeFromWishlist(@CurrentUser('id') customerId: string, @Param('productId') productId: string) {
    return this.customerService.removeFromWishlist(customerId, productId);
  }
}
