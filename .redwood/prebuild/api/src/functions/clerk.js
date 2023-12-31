import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js/instance/slice";
import _JSON$stringify from "@babel/runtime-corejs3/core-js/json/stringify";
import { verifyEvent } from '@redwoodjs/api/webhooks';
export const handler = async event => {
  try {
    var _context;
    const options = {
      signatureHeader: 'svix-signature',
      signatureTransformer: signature => {
        // Clerk can pass a space separated list of signatures.
        // Let's just use the first one that's of version 1
        const passedSignatures = signature.split(' ');
        for (const versionedSignature of passedSignatures) {
          const [version, signature] = versionedSignature.split(',');
          if (version === 'v1') {
            return signature;
          }
        }
      }
    };
    const svix_id = event.headers['svix-id'];
    const svix_timestamp = event.headers['svix-timestamp'];
    const payload = `${svix_id}.${svix_timestamp}.${event.body}`;
    verifyEvent('base64Sha256Verifier', {
      event,
      secret: _sliceInstanceProperty(_context = process.env.CLERK_WH_SECRET).call(_context, 6),
      payload,
      options
    });
    const parsedPayload = JSON.parse(event.body);
    const data = parsedPayload?.data;

    // Safely use the validated webhook payload
    const firstName = data?.first_name;
    const lastName = data?.last_name;
    const emailAddress = data?.email_addresses?.[0]?.email_address;
    const cellPhone = data?.phone_numbers?.[0]?.phone_number;
    const imageUrl = data?.image_url;
    const clerkUserId = data?.id;
    const dataForRequest = {
      firstName,
      lastName,
      emailAddress,
      cellPhone,
      imageUrl,
      clerkUserId
    };
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: _JSON$stringify({
        data: dataForRequest
      })
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 401
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ2ZXJpZnlFdmVudCIsImhhbmRsZXIiLCJldmVudCIsIl9jb250ZXh0Iiwib3B0aW9ucyIsInNpZ25hdHVyZUhlYWRlciIsInNpZ25hdHVyZVRyYW5zZm9ybWVyIiwic2lnbmF0dXJlIiwicGFzc2VkU2lnbmF0dXJlcyIsInNwbGl0IiwidmVyc2lvbmVkU2lnbmF0dXJlIiwidmVyc2lvbiIsInN2aXhfaWQiLCJoZWFkZXJzIiwic3ZpeF90aW1lc3RhbXAiLCJwYXlsb2FkIiwiYm9keSIsInNlY3JldCIsIl9zbGljZUluc3RhbmNlUHJvcGVydHkiLCJwcm9jZXNzIiwiZW52IiwiQ0xFUktfV0hfU0VDUkVUIiwiY2FsbCIsInBhcnNlZFBheWxvYWQiLCJKU09OIiwicGFyc2UiLCJkYXRhIiwiZmlyc3ROYW1lIiwiZmlyc3RfbmFtZSIsImxhc3ROYW1lIiwibGFzdF9uYW1lIiwiZW1haWxBZGRyZXNzIiwiZW1haWxfYWRkcmVzc2VzIiwiZW1haWxfYWRkcmVzcyIsImNlbGxQaG9uZSIsInBob25lX251bWJlcnMiLCJwaG9uZV9udW1iZXIiLCJpbWFnZVVybCIsImltYWdlX3VybCIsImNsZXJrVXNlcklkIiwiaWQiLCJkYXRhRm9yUmVxdWVzdCIsInN0YXR1c0NvZGUiLCJfSlNPTiRzdHJpbmdpZnkiLCJlIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwaS9zcmMvZnVuY3Rpb25zL2NsZXJrLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZlcmlmeU9wdGlvbnMsIHZlcmlmeUV2ZW50IH0gZnJvbSAnQHJlZHdvb2Rqcy9hcGkvd2ViaG9va3MnXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBvcHRpb25zOiBWZXJpZnlPcHRpb25zID0ge1xuICAgICAgc2lnbmF0dXJlSGVhZGVyOiAnc3ZpeC1zaWduYXR1cmUnLFxuICAgICAgc2lnbmF0dXJlVHJhbnNmb3JtZXI6IChzaWduYXR1cmU6IHN0cmluZykgPT4ge1xuICAgICAgICAvLyBDbGVyayBjYW4gcGFzcyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIHNpZ25hdHVyZXMuXG4gICAgICAgIC8vIExldCdzIGp1c3QgdXNlIHRoZSBmaXJzdCBvbmUgdGhhdCdzIG9mIHZlcnNpb24gMVxuICAgICAgICBjb25zdCBwYXNzZWRTaWduYXR1cmVzID0gc2lnbmF0dXJlLnNwbGl0KCcgJylcblxuICAgICAgICBmb3IgKGNvbnN0IHZlcnNpb25lZFNpZ25hdHVyZSBvZiBwYXNzZWRTaWduYXR1cmVzKSB7XG4gICAgICAgICAgY29uc3QgW3ZlcnNpb24sIHNpZ25hdHVyZV0gPSB2ZXJzaW9uZWRTaWduYXR1cmUuc3BsaXQoJywnKVxuXG4gICAgICAgICAgaWYgKHZlcnNpb24gPT09ICd2MScpIHtcbiAgICAgICAgICAgIHJldHVybiBzaWduYXR1cmVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfVxuXG4gICAgY29uc3Qgc3ZpeF9pZCA9IGV2ZW50LmhlYWRlcnNbJ3N2aXgtaWQnXVxuICAgIGNvbnN0IHN2aXhfdGltZXN0YW1wID0gZXZlbnQuaGVhZGVyc1snc3ZpeC10aW1lc3RhbXAnXVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IGAke3N2aXhfaWR9LiR7c3ZpeF90aW1lc3RhbXB9LiR7ZXZlbnQuYm9keX1gXG5cbiAgICB2ZXJpZnlFdmVudCgnYmFzZTY0U2hhMjU2VmVyaWZpZXInLCB7XG4gICAgICBldmVudCxcbiAgICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuQ0xFUktfV0hfU0VDUkVULnNsaWNlKDYpLFxuICAgICAgcGF5bG9hZCxcbiAgICAgIG9wdGlvbnMsXG4gICAgfSlcblxuICAgIGNvbnN0IHBhcnNlZFBheWxvYWQgPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpXG5cbiAgICBjb25zdCBkYXRhID0gcGFyc2VkUGF5bG9hZD8uZGF0YVxuXG4gICAgLy8gU2FmZWx5IHVzZSB0aGUgdmFsaWRhdGVkIHdlYmhvb2sgcGF5bG9hZFxuICAgIGNvbnN0IGZpcnN0TmFtZSA9IGRhdGE/LmZpcnN0X25hbWVcbiAgICBjb25zdCBsYXN0TmFtZSA9IGRhdGE/Lmxhc3RfbmFtZVxuICAgIGNvbnN0IGVtYWlsQWRkcmVzcyA9IGRhdGE/LmVtYWlsX2FkZHJlc3Nlcz8uWzBdPy5lbWFpbF9hZGRyZXNzXG4gICAgY29uc3QgY2VsbFBob25lID0gZGF0YT8ucGhvbmVfbnVtYmVycz8uWzBdPy5waG9uZV9udW1iZXJcbiAgICBjb25zdCBpbWFnZVVybCA9IGRhdGE/LmltYWdlX3VybFxuICAgIGNvbnN0IGNsZXJrVXNlcklkID0gZGF0YT8uaWRcblxuICAgIGNvbnN0IGRhdGFGb3JSZXF1ZXN0ID0ge1xuICAgICAgZmlyc3ROYW1lLFxuICAgICAgbGFzdE5hbWUsXG4gICAgICBlbWFpbEFkZHJlc3MsXG4gICAgICBjZWxsUGhvbmUsXG4gICAgICBpbWFnZVVybCxcbiAgICAgIGNsZXJrVXNlcklkLFxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBkYXRhOiBkYXRhRm9yUmVxdWVzdCxcbiAgICAgIH0pLFxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDQwMSxcbiAgICB9XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUF3QkEsV0FBVyxRQUFRLHlCQUF5QjtBQUVwRSxPQUFPLE1BQU1DLE9BQU8sR0FBRyxNQUFPQyxLQUFVLElBQUs7RUFDM0MsSUFBSTtJQUFBLElBQUFDLFFBQUE7SUFDRixNQUFNQyxPQUFzQixHQUFHO01BQzdCQyxlQUFlLEVBQUUsZ0JBQWdCO01BQ2pDQyxvQkFBb0IsRUFBR0MsU0FBaUIsSUFBSztRQUMzQztRQUNBO1FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUdELFNBQVMsQ0FBQ0UsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUU3QyxLQUFLLE1BQU1DLGtCQUFrQixJQUFJRixnQkFBZ0IsRUFBRTtVQUNqRCxNQUFNLENBQUNHLE9BQU8sRUFBRUosU0FBUyxDQUFDLEdBQUdHLGtCQUFrQixDQUFDRCxLQUFLLENBQUMsR0FBRyxDQUFDO1VBRTFELElBQUlFLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEIsT0FBT0osU0FBUztVQUNsQjtRQUNGO01BQ0Y7SUFDRixDQUFDO0lBRUQsTUFBTUssT0FBTyxHQUFHVixLQUFLLENBQUNXLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDeEMsTUFBTUMsY0FBYyxHQUFHWixLQUFLLENBQUNXLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztJQUV0RCxNQUFNRSxPQUFPLEdBQUksR0FBRUgsT0FBUSxJQUFHRSxjQUFlLElBQUdaLEtBQUssQ0FBQ2MsSUFBSyxFQUFDO0lBRTVEaEIsV0FBVyxDQUFDLHNCQUFzQixFQUFFO01BQ2xDRSxLQUFLO01BQ0xlLE1BQU0sRUFBRUMsc0JBQUEsQ0FBQWYsUUFBQSxHQUFBZ0IsT0FBTyxDQUFDQyxHQUFHLENBQUNDLGVBQWUsRUFBQUMsSUFBQSxDQUFBbkIsUUFBQSxFQUFPLENBQUMsQ0FBQztNQUM1Q1ksT0FBTztNQUNQWDtJQUNGLENBQUMsQ0FBQztJQUVGLE1BQU1tQixhQUFhLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDdkIsS0FBSyxDQUFDYyxJQUFJLENBQUM7SUFFNUMsTUFBTVUsSUFBSSxHQUFHSCxhQUFhLEVBQUVHLElBQUk7O0lBRWhDO0lBQ0EsTUFBTUMsU0FBUyxHQUFHRCxJQUFJLEVBQUVFLFVBQVU7SUFDbEMsTUFBTUMsUUFBUSxHQUFHSCxJQUFJLEVBQUVJLFNBQVM7SUFDaEMsTUFBTUMsWUFBWSxHQUFHTCxJQUFJLEVBQUVNLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBRUMsYUFBYTtJQUM5RCxNQUFNQyxTQUFTLEdBQUdSLElBQUksRUFBRVMsYUFBYSxHQUFHLENBQUMsQ0FBQyxFQUFFQyxZQUFZO0lBQ3hELE1BQU1DLFFBQVEsR0FBR1gsSUFBSSxFQUFFWSxTQUFTO0lBQ2hDLE1BQU1DLFdBQVcsR0FBR2IsSUFBSSxFQUFFYyxFQUFFO0lBRTVCLE1BQU1DLGNBQWMsR0FBRztNQUNyQmQsU0FBUztNQUNURSxRQUFRO01BQ1JFLFlBQVk7TUFDWkcsU0FBUztNQUNURyxRQUFRO01BQ1JFO0lBQ0YsQ0FBQztJQUVELE9BQU87TUFDTDFCLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRTtNQUNsQixDQUFDO01BQ0Q2QixVQUFVLEVBQUUsR0FBRztNQUNmMUIsSUFBSSxFQUFFMkIsZUFBQSxDQUFlO1FBQ25CakIsSUFBSSxFQUFFZTtNQUNSLENBQUM7SUFDSCxDQUFDO0VBQ0gsQ0FBQyxDQUFDLE9BQU9HLENBQUMsRUFBRTtJQUNWQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsQ0FBQyxDQUFDO0lBQ2QsT0FBTztNQUNMRixVQUFVLEVBQUU7SUFDZCxDQUFDO0VBQ0g7QUFDRixDQUFDIn0=