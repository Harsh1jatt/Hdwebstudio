import { getAllTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial } from '../../../../controllers/testimonialController';
import dbConnect from '../../../../lib/db';

export async function GET(request, { params }) {
  await dbConnect();
  if (params.id === 'all') {
    const testimonials = await getAllTestimonials();
    return Response.json({ success: true, data: testimonials, message: 'Fetched all testimonials' });
  } else {
    const testimonial = await getTestimonialById(params.id);
    return Response.json({ success: true, data: testimonial, message: 'Fetched testimonial' });
  }
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const testimonial = await createTestimonial(data);
  return Response.json({ success: true, data: testimonial, message: 'Testimonial created' });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const data = await request.json();
  const testimonial = await updateTestimonial(params.id, data);
  return Response.json({ success: true, data: testimonial, message: 'Testimonial updated' });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await deleteTestimonial(params.id);
  return Response.json({ success: true, data: null, message: 'Testimonial deleted' });
}
